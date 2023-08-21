def bldNbrs():
    neighbors[0] = 1
    neighbors[1] = -1
    neighbors[2] = diam
    neighbors[3] = -1 * diam
    neighbors[4] = 1 + -1 * diam
    neighbors[5] = -1 * diam - 1
    neighbors[6] = diam + 1
    neighbors[7] = diam - 1
def cellGen(cell: number, count: number):
    global val, nxt
    val = Universe[cell]
    if count < 2:
        nxt = 0
    if count == 2:
        nxt = val
    if count == 3:
        nxt = 1
    if count > 3:
        nxt = 0
    Next[cell] = nxt
def cntNbors(num: number):
    global tot
    tot = 0
    for index in range(8):
        tot = tot + Universe[findCell(num, neighbors[index])]
    return tot
def ShowAll():
    global index6, index7
    while index7 <= Edge:
        index6 = 0
        while index6 <= Edge:
            showUni(index6, index7)
            basic.pause(50)
            index6 += 1
        basic.show_icon(IconNames.YES)
        music.play_tone(262, music.beat(BeatFraction.QUARTER))
        index7 = 3 + index7
        index7 += 1
    basic.pause(100)
    showUni(0, 0)
def findCell(num2: number, num22: number):
    global total
    total = num2 + num22
    if total < 0:
        total = total + UNIall
    if total > unisize:
        total = total - UNIall
    return total
def doGen():
    global index2, froze, index3
    while index2 <= unisize:
        cellGen(index2, cntNbors(index2))
        index2 += 1
    froze = 1
    while index3 <= unisize:
        if Next[index3] != Universe[index3]:
            froze = 0
        Universe[index3] = Next[index3]
        index3 += 1
    if 1 == froze:
        basic.show_icon(IconNames.SMALL_SQUARE)
        music.start_melody(music.built_in_melody(Melodies.POWER_DOWN),
            MelodyOptions.ONCE)
    Chk_Extinct()
    showUni(0, 0)
def Chk_Extinct():
    global Pop, index4
    Pop = 0
    while index4 <= unisize:
        if 1 == Universe[index4]:
            Pop += 1
        index4 += 1
    if Pop == 0:
        basic.show_icon(IconNames.NO)
        basic.pause(100)
        basic.show_icon(IconNames.SAD)
        basic.pause(100)
        music.start_melody(music.built_in_melody(Melodies.FUNERAL), MelodyOptions.ONCE)
        basic.show_leds("""
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            """)
def showUni(X1: number, Y2: number):
    global uplace
    for ydex in range(5):
        for xdex in range(5):
            uplace = X1 + xdex + (Y2 + ydex) * diam
            if Universe[uplace] == 0:
                led.unplot(xdex, ydex)
            else:
                led.plot(xdex, ydex)

def on_button_pressed_a():
    doGen()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global pattern, index5
    clrUni()
    pattern = 1 + pattern
    if 3 < pattern:
        pattern = 0
    if 0 == pattern:
        setXY(1, 2)
        setXY(2, 2)
        setXY(3, 2)
        setXY(1, 1)
        setXY(2, 3)
    if 1 == pattern:
        setXY(1, 2)
        setXY(2, 2)
        setXY(3, 2)
    if 3 == pattern:
        setXY(1, 2)
        setXY(2, 2)
        setXY(3, 2)
        setXY(3, 3)
        setXY(2, 4)
    if 2 == pattern:
        index5 = 0
        while index5 <= diam - 1:
            setXY(2, index5)
            index5 += 1
    showUni(0, 0)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global index52
    while index52 <= unisize:
        if 8 < randint(0, 10):
            Universe[index52] = 1
        index52 += 1
    showUni(0, 0)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_pin_pressed_p1():
    ShowAll()
input.on_pin_pressed(TouchPin.P1, on_pin_pressed_p1)

def on_gesture_shake():
    Chk_Extinct()
    basic.show_string("Pop:")
    basic.show_string(convert_to_text(Pop))
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def setXY(nx: number, ny: number):
    Universe[nx + ny * diam] = 1

def on_logo_touched():
    ShowAll()
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

def findCoord(num3: number):
    global sy, sx
    sy = int(num3 / diam)
    sx = num3 % diam
def clrUni():
    global index10
    while index10 <= unisize:
        Universe[index10] = 0
        index10 += 1
index10 = 0
sx = 0
sy = 0
index52 = 0
index5 = 0
uplace = 0
index4 = 0
Pop = 0
index3 = 0
froze = 0
index2 = 0
total = 0
index6 = 0
index7 = 0
nxt = 0
val = 0
Next: List[number] = []
neighbors: List[number] = []
Universe: List[number] = []
pattern = 0
tot = 0
UNIall = 0
unisize = 0
Edge = 0
diam = 0
diam = 21
Edge = diam - 4
unisize = diam * diam - 1
UNIall = diam * diam
tot = 0
pattern = 0
Universe = [0]
neighbors = [0, 0, 0, 0, 0, 0, 0, 0]
bldNbrs()
for index8 in range(unisize):
    Universe.append(0)
Next = [unisize]
for index9 in range(unisize):
    Next.append(0)
images.create_big_image("""
    # . . # . # # . # #
    # . . . . # . . # .
    # . . # . # # . # #
    # . . # . # . . # .
    # # . # . # . . # #
    """).scroll_image(1, 200)
images.create_big_image("""
    . . . . . . . . . .
    . . . . # # . . . .
    . . . . # # . # # .
    . # # . . . . # # .
    . # # . . . . . . .
    """).scroll_image(1, 200)
basic.show_leds("""
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    """)