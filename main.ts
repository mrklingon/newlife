function bldNbrs () {
    neighbors[0] = 1
    neighbors[1] = -1
    neighbors[2] = diam
    neighbors[3] = -1 * diam
    neighbors[4] = 1 + -1 * diam
    neighbors[5] = -1 * diam - 1
    neighbors[6] = diam + 1
    neighbors[7] = diam - 1
}
function cellGen (cell: number, count: number) {
    val = Universe[cell]
    if (count < 2) {
        nxt = 0
    }
    if (count == 2) {
        nxt = val
    }
    if (count == 3) {
        nxt = 1
    }
    if (count > 3) {
        nxt = 0
    }
    Next[cell] = nxt
}
function cntNbors (num: number) {
    tot = 0
    for (let index = 0; index <= 7; index++) {
        tot = tot + Universe[findCell(num, neighbors[index])]
    }
    return tot
}
function ShowAll () {
    let index6: number;
while (index7 <= Edge) {
        index6 = 0
        while (index6 <= Edge) {
            showUni(index6, index7)
            basic.pause(50)
            index6 += 1
        }
        basic.showIcon(IconNames.Yes)
        music.playTone(262, music.beat(BeatFraction.Quarter))
        index7 = 3 + index7
        index7 += 1
    }
    basic.pause(100)
    showUni(cx, cy)
}
function findCell (num2: number, num22: number) {
    total = num2 + num22
    if (total < 0) {
        total = total + UNIall
    }
    if (total > unisize) {
        total = total - UNIall
    }
    return total
}
function doGen () {
    while (index2 <= unisize) {
        cellGen(index2, cntNbors(index2))
        index2 += 1
    }
    froze = 1
    while (index3 <= unisize) {
        if (Next[index3] != Universe[index3]) {
            froze = 0
        }
        Universe[index3] = Next[index3]
        index3 += 1
    }
    if (1 == froze) {
        basic.showIcon(IconNames.SmallSquare)
        music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
    }
    Chk_Extinct()
    showUni(cx, cy)
}
function Chk_Extinct () {
    Pop = 0
    while (index4 <= unisize) {
        if (1 == Universe[index4]) {
            Pop += 1
        }
        index4 += 1
    }
    if (Pop == 0) {
        basic.showIcon(IconNames.No)
        basic.pause(100)
        basic.showIcon(IconNames.Sad)
        basic.pause(100)
        music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
}
function showUni (X1: number, Y2: number) {
    for (let ydex = 0; ydex <= 4; ydex++) {
        for (let xdex = 0; xdex <= 4; xdex++) {
            uplace = X1 + xdex + (Y2 + ydex) * diam
            if (Universe[uplace] == 0) {
                led.unplot(xdex, ydex)
            } else {
                led.plot(xdex, ydex)
            }
        }
    }
}
input.onButtonPressed(Button.A, function () {
    doGen()
})
input.onGesture(Gesture.TiltLeft, function () {
    cx += -1
    if (cx < 0) {
        cx = 0
    }
    showUni(cx, cy)
})
input.onButtonPressed(Button.AB, function () {
    let index5: number;
clrUni()
    pattern = 1 + pattern
    if (3 < pattern) {
        pattern = 0
    }
    if (0 == pattern) {
        setXY(1, 2)
        setXY(2, 2)
        setXY(3, 2)
        setXY(1, 1)
        setXY(2, 3)
    }
    if (1 == pattern) {
        setXY(1, 2)
        setXY(2, 2)
        setXY(3, 2)
    }
    if (3 == pattern) {
        setXY(1, 2)
        setXY(2, 2)
        setXY(3, 2)
        setXY(3, 3)
        setXY(2, 4)
    }
    if (2 == pattern) {
        index5 = 0
        while (index5 <= diam - 1) {
            setXY(2, index5)
            index5 += 1
        }
    }
    showUni(0, 0)
})
input.onButtonPressed(Button.B, function () {
    while (index52 <= unisize) {
        if (8 < randint(0, 10)) {
            Universe[index52] = 1
        }
        index52 += 1
    }
    showUni(0, 0)
})
input.onPinPressed(TouchPin.P1, function () {
    ShowAll()
})
input.onGesture(Gesture.Shake, function () {
    Chk_Extinct()
    basic.showString("Pop:")
    basic.showString(convertToText(Pop))
})
function setXY (nx: number, ny: number) {
    Universe[nx + ny * diam] = 1
}
input.onGesture(Gesture.TiltRight, function () {
    cx += 1
    if (cx > diam - 4) {
        cx = diam - 4
    }
    showUni(cx, cy)
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    ShowAll()
})
function findCoord (num3: number) {
    sy = Math.trunc(num3 / diam)
    sx = num3 % diam
}
function clrUni () {
    while (index10 <= unisize) {
        Universe[index10] = 0
        index10 += 1
    }
}
let index10 = 0
let sx = 0
let sy = 0
let index52 = 0
let uplace = 0
let index4 = 0
let Pop = 0
let index3 = 0
let froze = 0
let index2 = 0
let total = 0
let cy = 0
let cx = 0
let index7 = 0
let nxt = 0
let val = 0
let Next: number[] = []
let neighbors: number[] = []
let Universe: number[] = []
let pattern = 0
let tot = 0
let UNIall = 0
let unisize = 0
let Edge = 0
let diam = 0
diam = 21
Edge = diam - 4
unisize = diam * diam - 1
UNIall = diam * diam
tot = 0
pattern = 0
Universe = [0]
neighbors = [
0,
0,
0,
0,
0,
0,
0,
0
]
bldNbrs()
for (let index = 0; index < unisize; index++) {
    Universe.push(0)
}
Next = [unisize]
for (let index = 0; index < unisize; index++) {
    Next.push(0)
}
images.createBigImage(`
    # . . # . # # . # #
    # . . . . # . . # .
    # . . # . # # . # #
    # . . # . # . . # .
    # # . # . # . . # #
    `).scrollImage(1, 200)
images.createBigImage(`
    . . . . . . . . . .
    . . . . # # . . . .
    . . . . # # . # # .
    . # # . . . . # # .
    . # # . . . . . . .
    `).scrollImage(1, 200)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
