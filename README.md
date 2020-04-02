# Botulus

## Aim

- A Bot built to create a new level of interactivity between my community and I with commands and other ambitious functions such as visual and audio cues. 


# Current "fix this pleeeeease" list

- Show !followage in "years, months, days, seconds ago" format. 
- Data persistence. Some of the commands use a counter that increments upon each use, so the bot can't just reset those counter values to 0 upon each reboot. Look into database. 
- Clip command has several issues that need fixing. 
  - - Clip currently says that RomculusTV has made the clip, instead of the person who used !clip. 
  - - Clip currently sends a finished, edited clip to the user, rather than an edit URL they can use to edit the clip themselves. 
  - - Command doesn't work if it attempts to return a whisper. 