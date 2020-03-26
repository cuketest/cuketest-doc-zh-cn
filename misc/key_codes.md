# 附录：输入键对应表

使用`pressKeys`将键击和击键组合发送到活动应用程序。

每个键由一个或多个字符表示。要指定单个键盘字符，请使用字符本身。例如，要表示字母A，请将字符串“A”传递给方法。 要表示多个字符，请将这些字符连起来作为字符串。例如，要表示字母A，B和C，请将参数指定为“ABC”。

加号（+），插入符号（^），百分号（%），波浪号（~）和括号()具有特殊含义。 要指定其中一个字符，请将其括在大括号`{}`中。 例如，要指定加号，请使用“{+}”。 要指定大括号字符，请使用“{\{}”和“{\}}”。 方括号（[]）没有特殊含义，但您必须将它们括在括号中。

更多相关说明或样例，请参照[模拟按键输入pressKeys方法](/node_api/pressKeys.md)。

若要指定非显示按键（例如ENTER或TAB）字符，以及表示操作而非字符的键，请使用下表中的代码。

Key | Code
---|---
BACKSPACE | {BACKSPACE}, {BS}, or {BKSP}
BREAK | {BREAK}
CAPS LOCK | {CAPSLOCK}
DEL or DELETE  |  {DELETE} or {DEL}
DOWN ARROW | {DOWN}
END | {END}
ENTER | {ENTER} or ~
ESC | {ESC}
HELP | {HELP}
HOME | {HOME}
INS or INSERT | {INSERT} or {INS}
LEFT ARROW | {LEFT}
NUM LOCK | {NUMLOCK}
PAGE DOWN | {PGDN}
PAGE UP | {PGUP}
PRINT SCREEN | {PRTSC} (reserved for future use)
RIGHT ARROW | {RIGHT}
SCROLL LOCK | {SCROLLLOCK}
TAB | {TAB}
UP ARROW | {UP}
F1 | {F1}
F2 | {F2}
F3 | {F3}
F4 | {F4}
F5 | {F5}
F6 | {F6}
F7 | {F7}
F8 | {F8}
F9 | {F9}
F10 | {F10}
F11 | {F11}
F12 | {F12}
F13 | {F13}
F14 | {F14}
F15 | {F15}
F16 | {F16}
Keypad add | {ADD}
Keypad subtract | {SUBTRACT}
Keypad multiply | {MULTIPLY}
Keypad divide | {DIVIDE}

要指定与SHIFT，CTRL和ALT键的任意组合组合的键，请在键代码前面添加一个或多个以下代码。

Key | Code
---|---
SHIFT | +
CTRL | ^
ALT | %

要指定在按下其他键时按住SHIFT，CTRL和ALT的任意组合，请将这些键的代码括在括号中。 例如，要指定在按下E和C时按住SHIFT，请使用“+(EC)”。 要指定在按下E时按住SHIFT，然后按C而不按SHIFT，请使用“+EC”。

要指定重复键，请使用{key number}形式。 您必须在键和数字之间放置一个空格。 例如，{LEFT 42}表示按下左箭头键42次; {h 10}表示按H 10次。