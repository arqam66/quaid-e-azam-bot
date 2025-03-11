const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Enhanced Jinnah information database - including successes, failures, and human elements
const jinnahInfo = {
    "birth": "Muhammad Ali Jinnah was born on December 25, 1876, in Karachi, British India (now Pakistan). His family was of modest means, but his father was a successful merchant who valued education.",
    "education": "Jinnah studied law at Lincoln's Inn in London and became a barrister in 1896. Despite facing cultural and language barriers, he excelled in his studies and was called to the Bar at the young age of 20.",
    "career": "Jinnah started his career as a lawyer and later joined politics. He was known as one of the most successful lawyers of his time, earning the nickname 'Ambassador of Hindu-Muslim Unity' early in his career.",
    "politics": "Jinnah initially joined the Indian National Congress in 1906 and later became a member of the Muslim League in 1913. His political journey transformed from being a strong advocate of Hindu-Muslim unity to eventually becoming the foremost leader demanding a separate state for Muslims.",
    "pakistan": "Jinnah was the founder of Pakistan and served as its first Governor-General after independence in 1947. He is known as Quaid-e-Azam, which means 'Great Leader'. What many don't know is that he envisioned Pakistan as a secular state where all religions would be respected.",
    "fourteen points": "In 1929, Jinnah presented his famous Fourteen Points, which outlined the constitutional and political principles to safeguard the interests of Muslims in British India. These points became the foundation for Muslim political demands in pre-partition India.",
    "two nation theory": "Jinnah was a strong advocate of the Two-Nation Theory, which stated that Hindus and Muslims were two separate nations that should have their own separate states. This theory became the philosophical foundation for the creation of Pakistan.",
    "personal life": "Jinnah married Rattanbai 'Ruttie' Petit in 1918, who was 24 years younger than him. They had one daughter named Dina. His marriage faced strong opposition due to their different religious backgrounds. Sadly, Ruttie died young at 29, leaving Jinnah devastated.",
    "death": "Jinnah died on September 11, 1948, due to tuberculosis and lung cancer, just a year after Pakistan's independence. His early death meant he couldn't fully establish many of his visions for Pakistan, leaving a leadership vacuum.",
    "legacy": "Jinnah is revered in Pakistan as the Quaid-e-Azam and Baba-e-Qaum (Father of the Nation). His portrait appears on all Pakistani currency notes. His famous quote 'Faith, Unity, Discipline' became Pakistan's national motto.",
    "early life": "Jinnah was born to a prosperous merchant family. His father, Jinnahbhai Poonja, was a merchant and his mother was Mithibai. He was the eldest of seven children and took on family responsibilities at a young age when his father faced business setbacks.",
    "appearance": "Jinnah was known for his elegant style of dressing and was often seen in well-tailored suits or traditional sherwani with a karakul cap, which later became known as the 'Jinnah cap'. His sophisticated appearance reflected his belief in the importance of presentation in leadership.",
    "leadership": "As a leader, Jinnah was known for his integrity, determination, and commitment to constitutionalism and democracy. He was a principled negotiator who relied on legal and constitutional means rather than mass movements.",
    "failures": "Despite his successes, Jinnah faced significant failures. He was unable to secure a united India with constitutional guarantees for Muslims, his initial goal. The partition led to massive violence and displacement that he had not anticipated. His vision of a secular Pakistan also remains unfulfilled, as the country later adopted a more religious identity. Additionally, his estrangement from his daughter Dina, who married a Parsi against his wishes, was a personal failure that pained him.",
    "health struggles": "Jinnah kept his deteriorating health a secret from the public. While leading the Pakistan movement, he was suffering from tuberculosis and later lung cancer. He worked tirelessly despite his illness, often pushing himself to physical exhaustion.",
    "famous speeches": "Jinnah's most famous speech was delivered on August 11, 1947, to the Constituent Assembly of Pakistan where he outlined his vision for Pakistan as a secular state: 'You are free to go to your temples, you are free to go to your mosques or to any other place of worship in this State of Pakistan. You may belong to any religion, caste or creed—that has nothing to do with the business of the State.'",
    "interesting facts": "Despite being the founder of Pakistan, Jinnah spoke Gujarati and English fluently but struggled with Urdu. He was an avid book reader, enjoyed playing billiards, and was known for his punctuality—he would often set his watch 10 minutes ahead. Despite being the leader of a Muslim state, Jinnah was known to enjoy an occasional whisky.",
    "last decisions": "In his final days, Jinnah made several crucial decisions to stabilize the newly formed Pakistan. He focused on establishing a strong administrative framework and emphasized the importance of unity among the diverse population. He also worked on addressing the refugee crisis resulting from the partition.",
    "family problems": "Jinnah's relationship with his daughter, Dina, was strained due to her marriage to a Parsi, Neville Wadia, against his wishes. This personal conflict deeply affected him, and they remained estranged for much of his later life. Despite this, Jinnah's love for his daughter never waned, and he continued to care for her well-being."
};

function speak(text) {
    // Create new speech synthesis utterance
    const text_speak = new SpeechSynthesisUtterance(text);
    
    // Set a slower rate (0.8 is slightly slower than the default of 1)
    text_speak.rate = 0.8;
    
    // Speak the text
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();
    let greeting;

    if (hour >= 0 && hour < 12) {
        greeting = "Good Morning! Welcome to the Jinnah Life Chatbot. I can tell you about Muhammad Ali Jinnah's achievements, struggles, and personal life.";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon! Welcome to the Jinnah Life Chatbot. Ask me anything about Quaid-e-Azam's journey and legacy.";
    } else {
        greeting = "Good Evening! Welcome to the Jinnah Life Chatbot. Discover the man behind the creation of Pakistan, including his successes and failures.";
    }
    
    speak(greeting);
}

window.addEventListener('load', () => {
    speak("Initializing Jinnah Life Chatbot. Please click the talk button to ask questions.");
    setTimeout(wishMe, 2000);
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = "Your question: " + transcript;
    processJinnahQuery(transcript.toLowerCase());
}

recognition.onend = () => {
    // No text change on end
}

recognition.onerror = (event) => {
    content.textContent = "Sorry, I couldn't hear you clearly. Please try again.";
}

btn.addEventListener('click', () => {
    content.textContent = "Listening for your question about Jinnah...";
    
    // Clear any previous speech
    window.speechSynthesis.cancel();
    
    recognition.start();
})

function findRelevantJinnahInfo(query) {
    // Check for direct matches first
    for (const [key, value] of Object.entries(jinnahInfo)) {
        if (query.includes(key)) {
            return value;
        }
    }

    // Check for related keywords
    if (query.includes("born") || query.includes("birthday") || query.includes("birthplace")) {
        return jinnahInfo["birth"];
    } else if (query.includes("study") || query.includes("university") || query.includes("college") || query.includes("school")) {
        return jinnahInfo["education"];
    } else if (query.includes("work") || query.includes("profession") || query.includes("lawyer")) {
        return jinnahInfo["career"];
    } else if (query.includes("founding") || query.includes("founder") || query.includes("created") || query.includes("creation")) {
        return jinnahInfo["pakistan"];
    } else if (query.includes("wife") || query.includes("daughter") || query.includes("family") || query.includes("married")) {
        return jinnahInfo["personal life"];
    } else if (query.includes("passed away") || query.includes("died")) {
        return jinnahInfo["death"];
    } else if (query.includes("remember") || query.includes("remembered") || query.includes("currency")) {
        return jinnahInfo["legacy"];
    } else if (query.includes("youth") || query.includes("childhood") || query.includes("parents")) {
        return jinnahInfo["early life"];
    } else if (query.includes("dress") || query.includes("clothes") || query.includes("cap") || query.includes("fashion")) {
        return jinnahInfo["appearance"];
    } else if (query.includes("lead") || query.includes("qualities")) {
        return jinnahInfo["leadership"];
    } else if (query.includes("congress") || query.includes("league") || query.includes("political")) {
        return jinnahInfo["politics"];
    } else if (query.includes("fourteen") || query.includes("14 points")) {
        return jinnahInfo["fourteen points"];
    } else if (query.includes("two nation") || query.includes("theory") || query.includes("separate nation")) {
        return jinnahInfo["two nation theory"];
    } else if (query.includes("fail") || query.includes("mistake") || query.includes("wrong")) {
        return jinnahInfo["failures"];
    } else if (query.includes("health") || query.includes("sick") || query.includes("ill")) {
        return jinnahInfo["health struggles"];
    } else if (query.includes("speech") || query.includes("said") || query.includes("quote")) {
        return jinnahInfo["famous speeches"];
    } else if (query.includes("interesting") || query.includes("fact") || query.includes("trivia")) {
        return jinnahInfo["interesting facts"];
    } else if (query.includes("last decision") || query.includes("final decision")) {
        return jinnahInfo["last decisions"];
    } else if (query.includes("family problem") || query.includes("family issue") || query.includes("family conflict")) {
        return jinnahInfo["family problems"];
    }

    // If no specific match, provide a general response about Jinnah
    return "Muhammad Ali Jinnah was the founder of Pakistan and is known as Quaid-e-Azam (Great Leader). He led the All-India Muslim League and achieved Pakistan's independence in 1947, but also faced personal struggles and political setbacks. You can ask me specific questions about his birth, education, failures, personal life, or legacy.";
}

function processJinnahQuery(message) {
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        speak("Hello! I am the Jinnah Life Chatbot. You can ask me about Muhammad Ali Jinnah's achievements, struggles, and personal life. What would you like to know about the founder of Pakistan?");
    } else if (message.includes('thank')) {
        speak("You're welcome! It's fascinating to explore the complete story of Quaid-e-Azam Muhammad Ali Jinnah - both his triumphs and challenges. Feel free to ask more questions.");
    } else if (message.includes('bye') || message.includes('goodbye')) {
        speak("Goodbye! Thank you for learning about the complex legacy of Muhammad Ali Jinnah.");
    } else if (message.includes('who are you') || message.includes('what are you')) {
        speak("I am the Jinnah Life Chatbot, designed to provide information about the life and legacy of Muhammad Ali Jinnah, the founder of Pakistan.");
    } else if (message.includes('who is jinnah') || message.includes('what is jinnah')) {
        speak(jinnahInfo["pakistan"] + " " + jinnahInfo["legacy"]);
    } else {
        // Process specific questions about Jinnah
        const response = findRelevantJinnahInfo(message);
        speak(response);
    }
}