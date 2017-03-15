import time
import datetime
from slackclient import SlackClient
import ephem
import math
import coordinates
import urllib
import requests
import tools
from cas_documentation import *
import bot_key
import astropy.time
import pytz

"""
    AstroSuperBot main Python module.
    
    References
    1) https://xavo95.github.io/blog/research/slack/2016/08/28/the-new-slack-bot
    2) http://stackoverflow.com/questions/13463965/pyephem-sidereal-time-gives-
    unexpected-result?noredirect=1&lq=1
    3) https://eureka.ykyuen.info/2015/04/17/python-convert-a-timezone-aware-datetime-to-utc-datetime-using-pytz/
    
"""

##### MAIN FUNCTIONS ######
def log_write(text, time_bool = True):
    if time_bool:
        output = str(time.ctime()) + ": " + str(text) + "\n"
    else:
        output = str(text) + "\n"
    f.write(output)
def getBotID(bot_name, slack_bot_token):
    """
        Get the Bot ID.
        
        Input <bot_name> and <slack_bot_token> as strings.
    """
    BOT_NAME = bot_name
    slack_client = SlackClient(slack_bot_token)
    api_call = slack_client.api_call("users.list")
    if api_call.get('ok'):
        # retrieve all users so we can find our bot
        users = api_call.get('members')
        for user in users:
            if 'name' in user and user.get('name') == BOT_NAME:
                return user.get('id')
    else: 
        raise ValueError

def getUserName(user_id, slack_bot_token):
    """
        Returns the name (last + first) of the user who posted a message to the
        bot.
        
        Input <user_id> and <slack_bot_token> are strings.
    """
    slack_client = SlackClient(slack_bot_token)
    api_call = slack_client.api_call("users.list")
    # retrieve all users so we can find our bot
    users = api_call.get('members')
    for user in users:
        if 'id' in user and user.get('id') == user_id:
            if user.get('real_name').strip() == "":
                return user.get("name")
            return user.get('real_name') 
def sidTime():
    """"
        Returns the sidereal time (accounted for DST also) in hh:mm:ss and the
        local time.
        
        Input: no input required
    """
    o = ephem.Observer()
    now = datetime.datetime.now()
    daylight_saving = time.localtime().tm_isdst
    
    if int(now.hour)-daylight_saving == -1:
        #in case it is at 12 am (because then -1 hour which should be 23)
        o.date = datetime.datetime(int(now.year), int(now.month), int(now.day),
                               23, int(now.minute), int(now.second))
    else:
        o.date = datetime.datetime(int(now.year), int(now.month), int(now.day),
                               int(now.hour)-daylight_saving, int(now.minute),
                               int(now.second))
    o.lon = '-1.33473' #longitude in radians
    response = ("Current Ithaca time: " + str(time.ctime()) +
                "\n Sidereal Time: " + str(o.sidereal_time()))
    return response
def jd(time1):
    """
        Returns the current JD date.
        
        Input <time> as a datetime object.
    """
    curr_time = astropy.time.Time(time1, scale="utc")
    return float(curr_time.jd)
def get_skychart(command):
    search = '' #the constellation that we are searching
    for j in range(len(command.split(" ")[1:])):
        search += str(command.split(" ")[1:][j]) + " "
    if str(search).strip() == "now":
        now = datetime.datetime.utcnow()
        julian = str(jd(now)-2400000.5)
        url_link = "http://www.heavens-above.com/wholeskychart.ashx?lat=42.444&lng=-76.5019&loc=Ithaca&alt=120&tz=EST&size=800&SL=1&SN=1&BW=0&time="+julian+"&ecl=0&cb=0"
        slack_client.api_call("chat.postMessage", channel=channel,
              text='', attachments='[{"fields": [{"title": " ", \
                   "short": true}],"image_url": "'+url_link+'"}]', as_user=True)
        return True
    try:
        local_tz = pytz.timezone("US/Eastern")
        year = int(str(command.split(" ")[1]).strip())
        month = int(str(command.split(" ")[2]).strip())
        day = int(str(command.split(" ")[3]).strip())
        hour = int(str(command.split(" ")[4]).strip())
        minute = int(str(command.split(" ")[5]).strip())
        second = int(str(command.split(" ")[6]).strip())
        datetime_without_tz = datetime.datetime(year, month, day, hour, minute, second)
        datetime_with_tz = local_tz.localize(datetime_without_tz, is_dst=True) # No daylight saving time
        datetime_in_utc = datetime_with_tz.astimezone(pytz.utc)
        
        now = datetime_in_utc
        julian = str(jd(now)-2400000.5)
        url_link = "http://www.heavens-above.com/wholeskychart.ashx?lat=42.444&lng=-76.5019&loc=Ithaca&alt=120&tz=EST&size=800&SL=1&SN=1&BW=0&time="+julian+"&ecl=0&cb=0"
        
        log_write("AstroBot " + response.strip())
        log_write("AstroBot [img]" + url_link)
        slack_client.api_call("chat.postMessage", channel=channel,
              text='', attachments='[{"fields": [{"title": " ", \
                   "short": true}],"image_url": "'+url_link+'"}]', as_user=True)
        return True
    except:
        response = 'Error: Invalid format. Use now or YYYY MM DD HH MM SS '
        log_write("AstroBot " + response.strip())
        slack_client.api_call("chat.postMessage", channel=channel,
              text=response, as_user=True)
def get_chart(response, command):
    """
        Returns a chart of a constellation given from command.
        
        Input <response> takes in a text message that would be given with the
        chart. Use '' as value if do not an accompanying text message.
        
        Input <command> takes in the command given by the user.
    """
    search = '' #the constellation that we are searching
    for j in range(len(command.split(" ")[1:])):
        search += str(command.split(" ")[1:][j]) + " "
    url_link = coordinates.chart(search) #search charts
    if type(url_link) != str: #if found nothing
        if len(response) == 0:
            response = 'Cannot find that constellation'
        log_write("AstroBot " + response.strip())
        slack_client.api_call("chat.postMessage", channel=channel,
              text=response, as_user=True)
    else:
        slack_client.api_call("chat.postMessage", channel=channel,
              text=response, attachments='[{"fields": [{"title": " ", \
                   "short": true}],"image_url": "'+url_link+'"}]', as_user=True)
        log_write("AstroBot " + response.strip())
        log_write("AstroBot [img]" + url_link)
def anyone(member_list):
    if len(member_list) == 0:
        response = "The observatory is closed. No one is there."
        return response
    else:
        response = "The following members are at the observatory: \n"
    for member in member_list:
        response += member + ", "
    return response
def get_coord(command):
    """
        Get coordinates and information of objects from catalogs gathered.
        Currently only have information for Messier/Caldwell/Planets.
        
        Input <command> takes in the command given by the user.
        
        Returns response to send to the user and the constellation the object
        is in.
    """
    
    obj = '' #the object that we are searching
    for j in range(len(command.split(" ")[1:])):
        obj += str(command.split(" ")[1:][j]).lower() + " "
    if "caldwell" in obj or "cald" in obj:
        catalog = "Caldwell"
        result1 = obj.replace("caldwell", "").replace("cald", "").strip()
        result1 = coordinates.coords(result1, "caldwell")
    elif "messier" in obj or "mess" in obj:
        catalog = "Messier" 
        result1 = coordinates.coords(obj)
    elif " all" in obj:
        catalog = "all available"
        result1 = coordinates.coords(obj.replace("all", ""), "all")
    else:
        catalog = "Messier"
        result1 = coordinates.coords(obj)
        
    planet = False #check if the objects returned are planets
  
    if len(result1) == 0: #if no object found
        response = ("No object found in the " + catalog +
                    " catalog (default \ catalog used is Messier and special \
                    objects - planets/moon).")
        return response, 'None'
    elif len(result1) == 1: #if found one
        response = "Found object \n"
    else: #if returning objects in a constellation
        response = "Returning all objects in the " + result1[0][2] +"\n\n"
        
    update_time = '' #time the planet catalog was last updated
    if len(result1) > 0:
        for i in range(len(result1)):
            if not result1[i][-1].lower() in ["planet", "moon"]:                        
                response += ("Object Name(s):" + result1[i][0] + "/" +
                             result1[i][1] + "\n")
                response += "In the " + result1[i][2] + ".\n"
                response += "Right Ascension (RA): " + result1[i][3] +"\n"
                response += "Declination (DEC): " + result1[i][4] + "\n"
                response += "Magnitude: " + result1[i][5] + "\n"
                response += "Object Type: " + result1[i][6] + "\n\n"
            elif result1[i][-1].lower() == "planet":
                planet = True
                response += "Object Name(s):" + result1[i][0] + "\n"
                response += "In the " + result1[i][2] + ".\n"
                response += "Right Ascension (RA): " + result1[i][3] +"\n"
                response += "Declination (DEC): " + result1[i][4] + "\n"
                response += "Magnitude: " + result1[i][5] + "\n"
                response += "Time Rises: " + result1[i][6] + "\n"
                response += "Time Sets: " + result1[i][7] + "\n"
                response += "Altitude: " + result1[i][8] + "\n"
                response += "Object Type: " + result1[i][10] + "\n\n"
                update_time = result1[i][9]
    if planet: #if there are planets returned
        response += "Planet info last updated on" + str(update_time)
    return response, result1[0][2]
def handle_command(command, channel, name):
    """
        Handle all commands given by the user.
    """
    actions = ["time", "coords", "closing", "opening", "flipping","here",
               "bye", "help", "anyone?", "weather", "chart", "locate",
               "skychart"] + ["off"]

    command_initial = command.split(" ")[0]

    if command_initial in actions:
        print command, name
        if command_initial == "help":
            action_show = actions[:-1] #not showing the off function in general
            response = str(action_show)
        elif command_initial == "off": #administrators only
            if (str(name) in ADMINS):
                slack_client.api_call("chat.postMessage", channel=channel,
                      text='AstroSuperBot off', as_user=True)
                exit()
            else: response = 'You are not authorized for this operation.'
        elif command_initial == "opening":
            response = OPENING_PROCEDURE
        elif command_initial == "closing":
            response = CLOSING_PROCEDURE
        elif command_initial == "flipping":
            response = FLIPPING_PROCEDURE
        elif command_initial == "chart":
            get_chart('',command)
            response = ''
        elif command_initial == "time":
            response = sidTime()
        elif command_initial == "here":
            if not name in CAS_MEMBER_HERE:
                CAS_MEMBER_HERE.append(name)
                response = "Welcome back " + name 
        elif command_initial == "bye":
            if name in CAS_MEMBER_HERE:
                CAS_MEMBER_HERE.remove(name)
                response = "Good bye " + name
        elif command_initial == "anyone?":
            response = anyone(CAS_MEMBER_HERE)
        elif command_initial == "skychart":
            get_skychart(command)
            response = ''
        elif command_initial == "weather":
            ######## need attention here
            urllib.urlretrieve("http://www.cleardarksky.com/c/IthacaNYcsk.gif",
                               "weather.gif")
            response = ''
            slack_client.api_call("chat.postMessage", channel=channel,
                      text=response, attachments='[{"fields": [{"title": \
                           "The Weather", "short": true}],"image_url": \
                           "http://www.cleardarksky.com/c/IthacaNYcsk.gif?c=1245652"}]',
                      as_user=True)
            log_write("AstroBot [img]" + "http://www.cleardarksky.com/c/IthacaNYcsk.gif?c=1245652")
        elif command_initial == "locate":
            response, const = get_coord(command)
            get_chart(response, "chart " + const.lower())
            response = ''
        elif command_initial == "coords":
            response, const = get_coord(command)
        else: response = ''
    else:
        response = "Command not found. Type help for more information."
    if response != '': log_write("AstroBot " + response.strip())
    slack_client.api_call("chat.postMessage", channel=channel,
                          text=response, as_user=True)

def parse_slack_output(slack_rtm_output):
    """
       Check what is incoming from Slack.
    """
    output_list = slack_rtm_output
    if output_list and len(output_list) > 0:
        for output in output_list:
            if output and 'text' in output and AT_BOT in output['text']:
                # return text after the @ mention, whitespace removed
                return [output['text'].split(AT_BOT)[1].strip().lower(),
                       output['channel'], getUserName(output['user'],
                                                      SLACK_BOT_TOKEN)]
    return None, None, None


##### MAIN PROGRAM ####

SLACK_BOT_TOKEN = bot_key.SLACK_BOT_TOKEN
BOT_NAME = bot_key.BOT_NAME
BOT_ID = getBotID(BOT_NAME, SLACK_BOT_TOKEN)
AT_BOT = "<@" + BOT_ID + ">"
READ_WEBSOCKET_DELAY = 1 # 1 second delay between reading from firehose
CAS_MEMBER_HERE = [] #for storing the members that are here
ADMINS = ["Dang Pham", "Zach Whipps"] #admins

FIRST_RUN = True
CHANNELS_LIST = {}
LOG_FILE = "log/astrobot_log"+str(datetime.datetime.now().year) + "-" + str(datetime.datetime.now().month) + "-" + str(datetime.datetime.now().day) +".dat"
f = open(LOG_FILE, "ab")

slack_client = SlackClient(SLACK_BOT_TOKEN)

if __name__ == "__main__":    
    if slack_client.rtm_connect():
        print("AstroSuperBot connected and running!")
        if FIRST_RUN:
            log_write("AstroBot Starting")
            chan_list = slack_client.api_call("channels.list")
            group_list = slack_client.api_call("groups.list")
        for output in chan_list['channels']:
            CHANNELS_LIST[str(output['id'])] = str(output['name'])
        for output2 in group_list['groups']:
            CHANNELS_LIST[str(output2['id'])] = str(output2['name'])
        log_write("\nStart user log: ", time_bool = False)
        while True:
            output_list = parse_slack_output(slack_client.rtm_read())
            command = output_list[0]
            channel = output_list[1]
            real_name = output_list[2]
            if command and channel:
                command = tools.remove_unicode(command.lower())
                real_name = tools.remove_unicode(real_name) 
                log_write(str(real_name) + " " + str(CHANNELS_LIST[channel]) + " " + str(command))
                handle_command(command, channel, real_name)
            time.sleep(READ_WEBSOCKET_DELAY)
    else:
        print("Connection failed. Invalid Slack token or bot ID?")
        log_write("AstroBot failed to Start. Connection failed.")

