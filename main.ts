function cutWords() {
    let listWords = ""
    let currentWord: int16[] = [];
    for (let i = 0; i <= signs.length - 1; i++) {
        if (i != 0 && signs[i]["previousPressed"] >= 4) {
            // end word
            listWords += analyseWord(currentWord) + " "
            currentWord = []
        }
        currentWord.push(signs[i]["during"])
    }
    listWords += analyseWord(currentWord)
    basic.showString(listWords)
}
function showOK() {
    // basic.showLeds("00010\n01001\n00001\n01001\n00010")
    basic.showLeds(`
        . # . # .
        . . . . .
        . . . . .
        # . . . #
        . # # # .
        `)
}
input.onLogoEvent(TouchButtonEvent.Released, () => signs = [])
input.onButtonPressed(Button.B, function () {
    cutWords()
})
function analyseWord(letter: number[]) {
    if (letter.length == 0) {
        return ""
    }
    let morseWord = ""
    for (let j = 0; j <= letter.length - 1; j++) {
        morseWord += letter[j] >= 3 ? "-" : "."
    }
    //console.log(morseWord)
    if (morseTable[morseWord as keyof string] != null) {
        return morseTable[morseWord as keyof string]
    }
    return ""
}
function showKO() {
    // basic.showLeds("00001\n01010\n00010\n01010\n00001")
    basic.showLeds(`
        . # . # .
        . . . . .
        . . . . .
        . # # # .
        # . . . #
        `)
}

let signs: Mark[] = []
let pressed = false
let lastPressed = 0
let previousPressed: number = 0
let timeBeginPressed: number;

class Mark {
    during: int16
    previousPressed: int16
}
type MapString = {
    [id: string]: string
}

const morseTable: MapString = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
}
let brightness = 100;
let direction = 10;
basic.forever(function () {
    //pulseBright()
    if (!(pressed) && input.buttonIsPressed(Button.A)) {
        lastPressed = 0
        timeBeginPressed = input.runningTime()
        pressed = true
    } else {
        if (pressed && !(input.buttonIsPressed(Button.A))) {
            pressed = false
            lastPressed = input.runningTime() - timeBeginPressed
            signs.push({ during: Math.round(lastPressed / 100), previousPressed: Math.round((timeBeginPressed - previousPressed) / 100) })
            previousPressed = input.runningTime()
        }
    }
})

function pulseBright() {
    if ((direction === 10 && brightness > 255) || (direction === -10 && brightness < 10)) {
        direction *= -1;
    }
    brightness += direction;
    led.setBrightness(brightness);
}