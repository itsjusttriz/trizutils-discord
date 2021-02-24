function publicPackMsg(packName, packLauncher, packLink) {
    let msg = `The current pack is ${packName || '@UNREGISTERED@'}. You can download it from ${packLauncher || 'Nowhere'}. -> ${packLink || '[No Link]'}`;

    return msg;
}

function betaPackMsg(packName, packLauncher, packLink) {
    let msg = `The current pack is ${packName || '@UNREGISTERED@'} [BETA]. You can download it from ${packLauncher || 'Nowhere'}. -> ${packLink || '[No Link]'}`;

    return msg;
}

function devPackMsg(packName) {
    let msg = `${packName || '@UNREGISTERED@'}. This pack is still in development and cannot be downloaded.`;

    return msg;
}

export const listpacks = ' [PackList unavailable. #BlameTriz!]';
export const amnesia = publicPackMsg('Amnesia', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/Amnesia');
export const atm3ex = publicPackMsg('All the Mods 3: Expert Mode', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/all-the-mods-3-expert');
export const antichem = publicPackMsg('Anti-Matter Chemistry', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/antimatter-chemistry');
export const astroblock = publicPackMsg('AstroBlock', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/astroblock');
export const blissfulbuilding = publicPackMsg('Blissful Building', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/blissful-building');
export const chaoticprogression = publicPackMsg('Chaotic Progression', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/chaotic-progression');
export const compactclaustrophobia = publicPackMsg('Compact Claustrophobia', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/compact-claustrophobia');
export const ddss = publicPackMsg('Dungeons, Dragons and Space Shuttles', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/dungeons-dragons-and-space-shuttles');
export const dimensionzero = publicPackMsg('Dimension Zero', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/dimension-zero');
export const dw20 = publicPackMsg('DireWolf20', 'FTB App', 'https://feed-the-beast.com/modpack/ftb_presents_direwolf20_1_16');
export const enigmatica2 = publicPackMsg('Enigmatica 2', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/enigmatica2');
export const enigmatica2ex = publicPackMsg('Enigmatica 2: Expert', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/enigmatica2expert');
export const enigmatica2skyex = publicPackMsg('Enigmatica 2 Skyblock: Expert', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/enigmatica2expertskyblock');
export const enigmatica4 = publicPackMsg('Enigmatica 4', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/enigmatica4');
export const enigmatica6 = publicPackMsg('Enigmatica 6', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/enigmatica6');
export const error404 = betaPackMsg('Error404');
export const ftbacademy = publicPackMsg('FTB Academy', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/ftb-academy');
export const ftbinteractions = publicPackMsg('FTB Interactions', 'FTB App', 'https://www.feed-the-beast.com/modpack/ftb_interactions');
export const glacialawakening = publicPackMsg('Glacial Awakening', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/glacial-awakening');
export const infinevo = publicPackMsg('FTB Infinity Evolved', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/ftb-infinity-evolved');
export const infinevo_expert = publicPackMsg('FTB Infinity Evolved Expert', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/ftb-infinity-evolved');
export const immersive_revolution = publicPackMsg('Immersive Revolution', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/immersive-revolution');
export const madpack4 = publicPackMsg('Madpack 4', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/madpack-4/');
export const mceternal = publicPackMsg('MCEternal', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/minecraft-eternal');
export const po3normal = publicPackMsg('Project Ozone 3 Normal', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/project-ozone-3-a-new-way-forward');
export const po3titan = publicPackMsg('Project Ozone 3 Titan', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/project-ozone-3-a-new-way-forward');
export const po3kappa = publicPackMsg('Project Ozone 3 Kappa', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/project-ozone-3-a-new-way-forward');
export const questingmayhem = publicPackMsg('Questing Mayhem', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/questing-mayhem');
export const rad = publicPackMsg('Roguelike Adventures and Dungeons', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/roguelike-adventures-and-dungeons');
export const ragnamodv = publicPackMsg('Ragnamod V', 'CurseForge', 'https://minecraft.curseforge.com/modpacks/ragnamod-v');
export const rlcraft = publicPackMsg('RLCraft', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/rlcraft');
export const rusticwaters = publicPackMsg('SeaBlock: Rustic Waters', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/seablock-rustic-waters');
export const sf4 = publicPackMsg('Sky Factory 4', 'CurseForge', 'https://minecraft.curseforge.com/projects/skyfactory-4');
export const skybees = publicPackMsg('Sky Bees', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/sky-bees');
export const skyodyssey = publicPackMsg('FTB Sky Odyssey', 'CurseForge', 'https://www.feed-the-beast.com/projects/ftb-sky-odyssey');
export const skyofdiamonds = publicPackMsg('Awakening: Sky of Diamonds', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/awakening-sky-of-diamonds');
export const skyworkshop = publicPackMsg('SkyWorkshop', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/skyworkshop');
export const stacia_expert = publicPackMsg('Stacia Expert', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/stacia-expert');
export const starfactory = publicPackMsg('Star Factory', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/star-factory');
export const stoneblock1 = publicPackMsg('StoneBlock 1', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/stoneblock');
export const stoneblock2 = publicPackMsg('StoneBlock 2', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/ftb-presents-stoneblock-2/');
export const towncraft = publicPackMsg('TownCraft', 'CurseForge', 'https://minecraft.curseforge.com/projects/towncraft');
export const trillionaire = publicPackMsg('Minecraft Trillionaire', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/minecraft-trillionaire');
export const volcanoblock = publicPackMsg('Volcano Block', 'CurseForge', 'https://www.curseforge.com/minecraft/modpacks/volcano-block');
export const vanilla = 'This is Vanilla Minecraft. (Ask a Mod/Broadcaster about the version)';
export const vanillaplus = 'This is Vanilla Minecraft with a few minor mods added for convenience. (Ask a Mod/Broadcaster about the version)';
export const none = 'There is currently no modpack being played, right now.';