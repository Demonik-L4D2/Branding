def update_discord():
    with open('discord.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    old_btn = '''<a
            href="https://discord.gg/wGU8ndUCh7"
            class="secondary-button discord-body-button"
            style="margin: 0; width: 100%; text-align: center; box-sizing: border-box;"
            >'''

    new_btn = '''<a
            href="https://discord.gg/wGU8ndUCh7"
            class="secondary-button discord-body-button"
            style="display: flex !important; margin: 0; width: 100%; justify-content: center; text-align: center; box-sizing: border-box;"
            >'''
      
    content = content.replace(old_btn, new_btn)
    with open('discord.html', 'w', encoding='utf-8') as f:
        f.write(content)

def update_steam():
    with open('steam.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    old_btn = '''<a href="https://steamcommunity.com/groups/DemonikLFD2" class="secondary-button" style="margin: 0; width: 100%; text-align: center; box-sizing: border-box;">JOIN STEAM GROUP</a>'''

    new_btn = '''<a href="https://steamcommunity.com/groups/DemonikLFD2" class="secondary-button" style="display: block; margin: 0; width: 100%; text-align: center; box-sizing: border-box;">JOIN STEAM GROUP</a>'''
      
    content = content.replace(old_btn, new_btn)
    with open('steam.html', 'w', encoding='utf-8') as f:
        f.write(content)

update_discord()
update_steam()
print("Updated subpage button displays")
