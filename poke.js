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

    // --- BUTTON CONTROLS ---
    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");
    const runBtn = document.getElementById("runBtn");

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