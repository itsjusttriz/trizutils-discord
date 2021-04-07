function publicPackMsg(packName, packLauncher, packLink) {
    let msg = `The current pack is ${packName || '@UNREGISTERED@'}. You can download it from ${packLauncher || 'Nowhere'}. -> ${packLink || '[No Link]'}`;

    return msg;
}

function betaPackMsg(packName, packLauncher, packLink) {
    let msg = `The current pack is ${packName || '@UNREGISTERED@'} [BETA]. You can download it from ${packLauncher || 'Nowhere'}. -> ${packLink || '[No Link]'}`;

    return msg;
}

function devPackMsg(packName, packDev = '') {
    let msg = `The current pack is ${packName}.${packDev ? ` This pack is created by ${packDev}.` : ''} This pack is still in development and cannot be downloaded.`;

    return msg;
}

export const packlist = {
    acalltoadventure: devPackMsg('A Call to Adventure', 'EnderGrimm'),
    amnesia: publicPackMsg('Amnesia', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/Amnesia'),
    atm3ex: publicPackMsg('All the Mods 3: Expert Mode', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/all-the-mods-3-expert'),
    antichem: publicPackMsg('Anti-Matter Chemistry', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/antimatter-chemistry'),
    astroblock: publicPackMsg('AstroBlock', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/astroblock'),
    blissfulbuilding: publicPackMsg('Blissful Building', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/blissful-building'),
    chaoticprogression: publicPackMsg('Chaotic Progression', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/chaotic-progression'),
    compactclaustrophobia: publicPackMsg('Compact Claustrophobia', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/compact-claustrophobia'),
    damageinc: publicPackMsg('Damage Inc', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/damage-inc-expert'),
    ddss: publicPackMsg('Dungeons, Dragons and Space Shuttles', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/dungeons-dragons-and-space-shuttles'),
    dimensionzero: publicPackMsg('Dimension Zero', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/dimension-zero'),
    dw20: publicPackMsg('DireWolf20', 'FTB App', 'https://feed-the-beast.com/modpack/ftb_presents_direwolf20_1_16'),
    engineerslife: publicPackMsg('Engineer\'s Life', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/engineers-life'),
    engineerslife2: publicPackMsg('Engineer\'s Life 2', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/engineers-life-2'),
    enigmatica2: publicPackMsg('Enigmatica 2', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/enigmatica2'),
    enigmatica2ex: publicPackMsg('Enigmatica 2: Expert', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/enigmatica2expert'),
    enigmatica2skyex: publicPackMsg('Enigmatica 2 Skyblock: Expert', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/enigmatica2expertskyblock'),
    enigmatica4: publicPackMsg('Enigmatica 4', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/enigmatica4'),
    enigmatica6: publicPackMsg('Enigmatica 6', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/enigmatica6'),
    error404: betaPackMsg('Error404'),
    ftbacademy: publicPackMsg('FTB Academy', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/ftb-academy'),
    ftbinteractions: publicPackMsg('FTB Interactions', 'FTB App', 'https://www.feed-the-beast.com/modpack/ftb_interactions'),
    glacialawakening: publicPackMsg('Glacial Awakening', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/glacial-awakening'),
    infinevo: publicPackMsg('FTB Infinity Evolved', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/ftb-infinity-evolved'),
    infinevo_expert: publicPackMsg('FTB Infinity Evolved Expert', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/ftb-infinity-evolved'),
    immersive_revolution: publicPackMsg('Immersive Revolution', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/immersive-revolution'),
    levitated: publicPackMsg('Levitated', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/levitated'),
    madpack4: publicPackMsg('Madpack 4', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/madpack-4/'),
    mceternal: publicPackMsg('MCEternal', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/minecraft-eternal'),
    po3normal: publicPackMsg('Project Ozone 3 Normal', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/project-ozone-3-a-new-way-forward'),
    po3titan: publicPackMsg('Project Ozone 3 Titan', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/project-ozone-3-a-new-way-forward'),
    po3kappa: publicPackMsg('Project Ozone 3 Kappa', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/project-ozone-3-a-new-way-forward'),
    questingmayhem: publicPackMsg('Questing Mayhem', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/questing-mayhem'),
    rad: publicPackMsg('Roguelike Adventures and Dungeons', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/roguelike-adventures-and-dungeons'),
    ragnamodv: publicPackMsg('Ragnamod V', 'CurseForge', 'https://minecraft.curseforge.com/modpacks/ragnamod-v'),
    rlcraft: publicPackMsg('RLCraft', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/rlcraft'),
    rusticwaters: publicPackMsg('SeaBlock: Rustic Waters', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/seablock-rustic-waters'),
    sf4: publicPackMsg('Sky Factory 4', 'CurseForge', 'https://minecraft.curseforge.com/projects/skyfactory-4'),
    skybees: publicPackMsg('Sky Bees', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/sky-bees'),
    skyodyssey: publicPackMsg('FTB Sky Odyssey', 'CurseForge', 'https://www.feed-the-beast.com/projects/ftb-sky-odyssey'),
    skyofdiamonds: publicPackMsg('Awakening: Sky of Diamonds', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/awakening-sky-of-diamonds'),
    skyworkshop: publicPackMsg('SkyWorkshop', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/skyworkshop'),
    stacia_expert: publicPackMsg('Stacia Expert', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/stacia-expert'),
    starfactory: publicPackMsg('Star Factory', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/star-factory'),
    stoneblock1: publicPackMsg('StoneBlock 1', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/stoneblock'),
    stoneblock2: publicPackMsg('StoneBlock 2', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/ftb-presents-stoneblock-2/'),
    towncraft: publicPackMsg('TownCraft', 'CurseForge', 'https://minecraft.curseforge.com/projects/towncraft'),
    trillionaire: publicPackMsg('Minecraft Trillionaire', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/minecraft-trillionaire'),
    volcanoblock: publicPackMsg('Volcano Block', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/volcano-block'),
    vaulthunters: publicPackMsg('Vault Hunters', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/vault-hunters-official-modpack'),

    // Non-Modded
    vanilla: 'This is Vanilla Minecraft. (Ask a Mod/Broadcaster about the version)',
    vanillaplus: 'This is Vanilla Minecraft with a few minor mods added for convenience. (Ask a Mod/Broadcaster about the version)',
    none: 'There is currently no modpack being played, right now.'
}