OPENING_PROCEDURE = '''Opening Procedure:\n
1. Remove tarp\n
2. Climb tall ladder near the slit, remove pipe from wheel.\n
3. Turn wheel, open dome\n
4. Remove Irv's dust cover/lens cap\n
5. Remove the piece of wood keeping tension off of the dome-\n
driving belt.\n
6. Tighten the bolt such that you can just slide the tip of your\n
pinky between the wheel and the belt.\n
7. Bring telescope down with Declination knob (white tape)\n
8. Start the clock drive\n '''

CLOSING_PROCEDURE = '''Closing procedure:\n
Turn off and wind up the clockdrive.\n

Remove the eyepiece from the telescope and reinsert the adapter (if removed) and dust cap.\n
Make sure the Telrad is off.\n
Move the telescope to the XXIV mark on the RA dial.\n
Park the telescope at 45 degrees S (roughly parallel with the floor).\n
Make sure that both the DEC axis and RA axis are firmly locked!\n
Rotate the dome so that the slit is facing south.\n
Climb the tall ladder in the south part of the room and carefully put the dust cover over \n the telescope's objective lens.\n
Close the dome slit and reinsert the restraining bar.\n
Carefully put the dust cover over the finderscope's lens\n
Put the tarp back over the telescope. Make sure that the entire telescope is covered \n(especially the focuser, finderscope, and RA/DEC circles).\n
Take tension off the dome-driver belt by loosening the bolt and reinserting the piece of \nwood.
Make sure all equipment is away in the cabinet or on shelves.\n
Turn off all dome and deck lights.\n
Close and lock both the deck door and the dome door.\n '''

FLIPPING_PROCEDURE = '''Flipping Irv \n
-Unlock the right ascension (RA) knob, and move the\n
telescope to the XXIV mark on the RA dial (above the "ship's\n
wheel"). \n
- Lock the RA knob. \n
- Unlock the declination (Dec) knob and move the scope so\n
that it is pointing roughly due north (~90 degrees N on the Dec\n
circle). The telescope should be parallel with the mount's\n
polar axis (see diagram on page 3). \n
- Lock the Dec knob. \n
- Loosen the RA knob again before flipping. This ensures that\n
the RA brake won't get worn down. The telescope will be\n
easier to flip as well. \n
- Using the "ship's wheel", rotate the telescope over the mount\n
until it is at the XXIV mark again on the RA dial. \n
- Unlock the Dec knob and move telescope to desired object. Be\n
careful not to push the telescope into the mount while\n
bringing it down from 90 degree N. \n'''

GENERAL_HELP = ''' AstroSuperBot \n

AstroSuperBot is a Slack bot for CAS. Call the bot by typing in @astrosuperbot followed by a command. For example, @astrosuperbot time or @astrosuperbot weather. \n
Currently, the following commands are available: \n
time, opening, flipping, closing, coords, locate, chart, weather, skychart \n\n

1) time: Gives current time in Ithaca and the current sidereal time.
   e.g. @astrosuperbot time
2) opening: Gives the opening procedure.
   e.g. @astrosuperbot opening
3) closing: Gives the closing procedure.
4) flipping: Gives the flipping procedure.
5) coords: Gives the coordinates of either an object or all objects in a given constellation. coords can search for official designation such as M81 or C12 and common name such as Owl Cluster. There are currently 2 catalogs supported: the Caldwell and Messier catalog. By default, coords search for objects in the Messier catalog. coords can also find planets. The syntax is: coords <object name> <catalog>. Leaving <catalog> blank will make coords search in the Messier catalog and for planets only. Specifying <catalog> as all will search all available catalogs.
    e.g. @astrosuperbot coords mars 
    e.g. @astrosuperbot coords m81
    e.g. @astrosuperbot coords owl cluster caldwell
    e.g. @astrosuperbot coords c53 caldwell
    e.g. @astrosuperbot coords c13 all
    e.g. @astrosuperbot coords virgo constellation or @astrosuperbot coords virgo c
    e.g. @astrosuperbot coords virgo constellation caldwell or @astrosuperbot coords virgo c caldwell
    e.g. @astrosuperbot coords virgo constellation all or @astrosuperbot coords virgo c all
6) locate: Gives the information from coords and an accompanying chart of the constellation. Syntax and call is the same as that of coords.
7) chart: Gives the chart of a specified constellation.
    e.g. chart virgo
8) weather: Gives a picture of Ithaca weather from cleardarksky.net
    e.g. @astrosuperbot weather
9) skychart: Gives the picture of the sky. Can do a current sky chart right now or any time in the future of the past. The syntax are either @astrosuperbot skychart now or @astrosuperbot skychart YYYY MM DD HH MM SS. 
    e.g. @astrosuperbot skychart now
    e.g. @astrosuperbot 2014 3 2 1 0 0
    
That is all we have right now. Any suggestions are welcome! Also, be nice to the bot :). 
'''