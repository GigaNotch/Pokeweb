document.addEventListener("DOMContentLoaded", () => {
    
    // --- DYNAMIC POKEMON DATA ---
    const centerSummonContainer = document.getElementById('center-summon-container');
    const hudName = document.getElementById('hudName');
    const dialogText = document.getElementById("dialogText");
    
    // We link your file names directly to the Pokemon names you provided
    const pokemonList = [
        { file: "Gif/Creature Pokemon Sprite Sticker.gif", name: "SNORLAX" },
        { file: "Gif/Pixel Pokemon Sticker (1).gif", name: "GASTLY" },
        { file: "Gif/Pixel Pokemon Sticker (2).gif", name: "PIDGEOT" },
        { file: "Gif/Pixel Pokemon Sticker (3).gif", name: "ALAKAZAM" },
        { file: "Gif/Pixel Pokemon Sticker.gif", name: "LATIAS" },
        { file: "Gif/pokemon sprite STICKER.gif", name: "WEEPINBELL" },
        { file: "Gif/pokemon STICKER.gif", name: "VENUSAUR" }
    ];

    let isTypingFinished = false; // Tracks if the typewriter effect is done

    function summonNextPokemon() {
        centerSummonContainer.innerHTML = '';

        // Pick a random Pokemon from the list
        const randomPoke = pokemonList[Math.floor(Math.random() * pokemonList.length)];
        
        // Setup the image
        const img = document.createElement('img');
        img.src = randomPoke.file;
        img.className = 'summoned-pokemon';
        centerSummonContainer.appendChild(img);

        // NEW: Update the HUD name to match the summoned Pokemon
        hudName.textContent = randomPoke.name;

        // NEW: Update the dialog text box to match, but only if the opening typing animation is finished
        if (isTypingFinished) {
            dialogText.innerHTML = "Wild " + randomPoke.name + " appeared!";
        }
    }

    // Start the summoning loop
    summonNextPokemon();
    setInterval(summonNextPokemon, 4000);

    // --- TYPEWRITER TEXT ---
    const dialogArrow = document.getElementById("dialogArrow");
    const actionMenu = document.getElementById("actionMenu");
    
    // Typewriter effect setup
    const textToType = "Wild DITTO appeared!";
    let i = 0;
    const typingSpeed = 50; 

    function typeWriter() {
        if (i < textToType.length) {
            dialogText.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Typing is done! Allow the dynamic names to start showing up
            isTypingFinished = true;
            dialogArrow.style.display = "block"; 
            
            setTimeout(() => {
                dialogArrow.style.display = "none";
                actionMenu.style.display = "flex";
            }, 1500);
        }
    }

    // Start the text typing animation 1 second after page load
    setTimeout(typeWriter, 1000);

    // --- BUTTON CONTROLS & INSTAGRAM AUDIO FIX ---
    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");
    const runBtn = document.getElementById("runBtn");

    // 1. Attempt to play the music immediately
    let playPromise = bgMusic.play();

    // 2. Check if the browser (Instagram/Safari) blocked the music
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Success! The music is playing normally.
            musicBtn.textContent = "MUSIC: ON";
        }).catch(error => {
            // BLOCKED! Instagram stopped the audio. 
            // We must create a "Tap to Start" screen to unlock the audio.
            musicBtn.textContent = "MUSIC: OFF";
            
            const startScreen = document.createElement('div');
            startScreen.style.position = 'fixed';
            startScreen.style.top = '0';
            startScreen.style.left = '0';
            startScreen.style.width = '100vw';
            startScreen.style.height = '100vh';
            startScreen.style.backgroundColor = 'rgba(0,0,0,0.85)';
            startScreen.style.color = '#FFFFFF';
            startScreen.style.display = 'flex';
            startScreen.style.justifyContent = 'center';
            startScreen.style.alignItems = 'center';
            startScreen.style.fontSize = '32px';
            startScreen.style.fontFamily = "'VT323', monospace";
            startScreen.style.zIndex = '9999';
            startScreen.style.cursor = 'pointer';
            startScreen.style.letterSpacing = '2px';
            startScreen.innerText = "TAP ANYWHERE TO START";
            
            document.body.appendChild(startScreen);

            // 3. When they tap the screen, unlock audio and hide the screen
            startScreen.addEventListener('click', () => {
                bgMusic.play();
                musicBtn.textContent = "MUSIC: ON";
                startScreen.remove(); // Delete the black screen
            });
        });
    }

    musicBtn.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.textContent = "MUSIC: ON";
        } else {
            bgMusic.pause();
            musicBtn.textContent = "MUSIC: OFF";
        }
        if (navigator.vibrate) navigator.vibrate(30);
    });

    runBtn.addEventListener('click', function() {
        if (navigator.vibrate) navigator.vibrate(30);
        dialogText.innerHTML = "Got away safely!";
        actionMenu.style.display = "none";
        
        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 1500);
    });
});
