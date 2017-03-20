from bs4 import *
import requests
import urllib2
import urllib
import time
from tools import *

PLANET_LIST = ["Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus",
               "Neptune", "Pluto"]
def get_planets_data():
    url = "http://www.heavens-above.com/PlanetSummary.aspx?lat=42.4528&lng=-76.4745&loc=Fuertes+Observatory&alt=275&tz=EST"
    soup = BeautifulSoup(urllib2.urlopen(url).read(), 'html.parser')
    table = soup.find('table',{'class':'standardTable'})
    
    rows = table.find_all('tr')
    planets_data = [[] for _ in range(9)]
    for tr in rows:
        cols = tr.find_all('td')
        for j in range(len(cols)):
            planets_data[j].append(cols[j].text)
    #formatting the list entries
    for i in range(len(planets_data)):
        for j in range(len(planets_data[i])):
            if j == 1 or j == 2: #fix the RA/DEC
                new_entry = planets_data[i][j].replace(" ", ":")
                new_entry = remove_letters(remove_unicode(new_entry))
                planets_data[i][j] = new_entry
            elif j == 9 or j == 10:
                new_entry = remove_unicode(planets_data[i][j] + " degrees")
                planets_data[i][j] = new_entry
            elif j == 5:
                planets_data[i][j] = str(planets_data[i][j]) + " Constellation"
    return [planets_data, time.ctime()]   
def cat_read(planet_update):        
    cat_result = [[],[],[]] #sublist for each catalog
    #currently: cat_result[0] for messier, 1 for caldwell, 2 for planets
    for messier in messier_content:
        ra_coord = str(messier[3])
        dec_coord = str(messier[4])
        
        name = str(messier[0])
        common_name = str(messier[1])
        const = str(messier[2]) + " Constellation"
        magnitude = str(messier[5])
        obj_type = str(messier[6])
        
        cat_result[0].append([name, common_name, const,
                              ra_coord, dec_coord, magnitude, obj_type])
    for caldwell in caldwell_content:
        ra_coord = str(caldwell[6]).strip().replace(" ", ":")
        dec_coord = str(caldwell[7]).strip().replace(" ", ":")
        
        name = ("Caldwell " + str(caldwell[0]).strip() + "/C" +
                str(caldwell[0]).strip())
        common_name = str(caldwell[10]).strip()
        const = str(caldwell[8]).strip() + " Constellation"
        magnitude = str(caldwell[3]).strip()
        obj_type = str(caldwell[2]).strip()
        if str(caldwell[1]).strip() != " - ":
            name += "/NGC" + str(caldwell[1]).strip().replace("/","&")

        cat_result[1].append([name, common_name, const,
                              ra_coord, dec_coord, magnitude, obj_type])
    for planet in planets_content[1:]:
        ra_coord = str(planet[1])
        dec_coord = str(planet[2])
        
        name = str(planet[0])
        common_name = name
        const = str(planet[5])
        magnitude = str(planet[4])
        obj_type = "Planet"
        rises = str(planet[7])
        sets = str(planet[8])
        altitude = str(planet[9])
        
        cat_result[2].append([name, common_name, const,
                              ra_coord, dec_coord, magnitude, rises,
                              sets, altitude, planet_update, obj_type])
        
    return cat_result
def findwithcatalog(name, catalog):
    constellation = []
    for i in range(len(catalog)):
        if (name.lower() in catalog[i][0].lower()
            or name.lower() in catalog[i][1].lower()):
            return [catalog[i]]
        if name.lower() in catalog[i][2].lower():
            constellation.append(catalog[i])
    return constellation
def coords(name, catalog = "messier"):
    name = str(name).strip().lower()
    update_time = 'N/A'
    for i in PLANET_LIST:
        if name.lower() in str(i.lower()) or catalog == "all":
            planet_data = get_planets_data()
            planets_content = planet_data[0]
            update_time = planet_data[1]
            break
        
    result = cat_read(update_time)
    
    result_messier = result[0]
    result_caldwell = result[1]
    result_planet = result[2]
    allcatalog = combine_list(result)
    #special for planets
    for i in result_planet:
        if name.lower() in str(i[0]).lower():
            return findwithcatalog(name, result_planet)
        
    if catalog == "messier":     
        return findwithcatalog(name, result_messier)
    elif catalog == "caldwell":
        return findwithcatalog(name, result_caldwell)
    elif catalog == "all":
        return findwithcatalog(name, allcatalog)
    
def chart(name, database = "abbr.csv"):
    abbr = []
    with open(database, 'r') as f:
        for line in f:
            abbr.append(list(eval(line)))
    for i in range(len(abbr)):
        full_lower =  str(abbr[i][0]).lower().strip()
        abbr_lower =  str(abbr[i][1]).lower().strip()
        name = name.strip().lower()
        if ((name == full_lower) or (name == ' '.join(full_lower.split(" ")[:-1])) or (name in abbr_lower)):
            return str('https://www.iau.org/static/archives/images/screen/'+ abbr[i][1].lower()+'.jpg')
        

messier_content = []
caldwell_content = []
planets_content = []
with open("obj_list.csv", "r") as f:
    for line in f:
        messier_content.append(list(eval(line)))
with open("obj_file_4.csv", "r") as f:
    for line in f:
        caldwell_content.append(list(eval(line)))
planet_data = get_planets_data()
planets_content = planet_data[0]
update_time = planet_data[1]