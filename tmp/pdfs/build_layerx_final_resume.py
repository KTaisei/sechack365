from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output" / "pdf" / "LayerX_hackathon_resume_final.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

W, H = A4
M = 15 * mm
CW = W - 2 * M
NAVY = colors.HexColor("#12243B")
BLUE = colors.HexColor("#3478F6")
INK = colors.HexColor("#172235")
MUTED = colors.HexColor("#607087")
LINE = colors.HexColor("#D7E1ED")
PALE = colors.HexColor("#F4F7FB")
WHITE = colors.white

FONT_PATH = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
pdfmetrics.registerFont(TTFont("JP", FONT_PATH))
JP = "JP"

c = canvas.Canvas(str(OUT), pagesize=A4)
c.setTitle("LayerX AI Agent Hackathon - Resume")
c.setAuthor("Taisei Kawakami")
c.setSubject("LayerX Student Hackathon 2026 application resume")


def para(text, x, y_top, width, size=8.5, leading=None, color=INK, align=TA_LEFT):
    style = ParagraphStyle(
        "body",
        fontName=JP,
        fontSize=size,
        leading=leading or size * 1.55,
        textColor=color,
        alignment=align,
        allowWidows=0,
        allowOrphans=0,
    )
    p = Paragraph(text, style)
    _, ph = p.wrap(width, H)
    p.drawOn(c, x, y_top - ph)
    return ph


def header(page, title, subtitle):
    c.setFillColor(NAVY)
    c.rect(0, H - 39 * mm, W, 39 * mm, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.roundRect(M, H - 17 * mm, 44 * mm, 6 * mm, 3 * mm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(JP, 7.2)
    c.drawCentredString(M + 22 * mm, H - 15.2 * mm, "LayerX Hackathon 2026")
    c.setFont(JP, 18)
    c.drawString(M, H - 27 * mm, title)
    c.setFillColor(colors.HexColor("#B7C6D9"))
    c.setFont(JP, 7.8)
    c.drawString(M, H - 34 * mm, subtitle)
    c.setFillColor(MUTED)
    c.setFont(JP, 7)
    c.drawRightString(W - M, 8 * mm, f"{page} / 2")


def section(title, y):
    c.setFillColor(BLUE)
    c.roundRect(M, y - 5.7 * mm, 2.1 * mm, 5.7 * mm, 1 * mm, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont(JP, 11)
    c.drawString(M + 5 * mm, y - 4.5 * mm, title)
    return y - 9.3 * mm


def info_row(items, y, widths):
    x = M
    for (label, value), width in zip(items, widths):
        c.setFillColor(PALE)
        c.setStrokeColor(LINE)
        c.roundRect(x, y - 13 * mm, width, 13 * mm, 2 * mm, fill=1, stroke=1)
        c.setFillColor(MUTED)
        c.setFont(JP, 6.8)
        c.drawString(x + 3 * mm, y - 4 * mm, label)
        para(escape(value), x + 3 * mm, y - 6 * mm, width - 6 * mm, size=8.4, leading=4.2 * mm)
        x += width + 4 * mm


def card(title, body, y, url=None, height=32 * mm):
    c.setFillColor(WHITE)
    c.setStrokeColor(LINE)
    c.roundRect(M, y - height, CW, height, 2.5 * mm, fill=1, stroke=1)
    c.setFillColor(NAVY)
    c.setFont(JP, 9.4)
    c.drawString(M + 4 * mm, y - 6 * mm, title)
    body_y = y - 9 * mm
    bh = para(body, M + 4 * mm, body_y, CW - 8 * mm, size=8.1, leading=4.4 * mm)
    if url:
        link_y = y - height + 4.2 * mm
        link = escape(url)
        para(f'<link href="{link}" color="#3478F6">{link}</link>', M + 4 * mm, link_y + 3.3 * mm, CW - 8 * mm, size=7.1, leading=3.4 * mm, color=BLUE)
        c.linkURL(url, (M + 4 * mm, link_y, M + CW - 4 * mm, link_y + 4.2 * mm), relative=0)
    return y - height - 4 * mm


# Page 1
header(1, "履歴書・技術プロフィール", "LayerX 学生向け AI Agent ハッカソン応募資料")
y = H - 47 * mm
y = section("基本情報", y)
gap = 4 * mm
w1 = 74 * mm
w2 = CW - w1 - gap
info_row([("氏名", "川上 泰正"), ("氏名（ローマ字）", "Taisei Kawakami")], y, [w1, w2])
y -= 17 * mm
info_row([("メールアドレス", "thailandcorrect@gmail.com"), ("電話番号", "080-8117-9164")], y, [w1, w2])
y -= 20 * mm

y = section("学歴", y)
info_row([("大学・学部・学科", "岡山県立大学 情報工学部 情報システム工学科")], y, [CW])
y -= 17 * mm
info_row([("在学期間・卒業予定", "2026年4月入学 - 在学中（2030年3月卒業見込み）")], y, [CW])
y -= 18 * mm

y = section("所属・活動", y)
info_row([("プログラム", "SecHack365 2026年度 学習駆動コース 大神ゼミ 所属")], y, [CW])
y -= 18 * mm

y = section("プロフィール", y)
profile = (
    "岡山県立大学情報工学部情報システム工学科に在学し、個人開発とSecHack365で、身近な課題を技術で解決する制作に取り組んでいます。"
    "Pythonを約3年間使用しており、生成AIを活用しながらWeb・モバイル・ローカルLLMを用いたアプリケーションを開発してきました。"
    "実装すること自体を目的とせず、利用者にとって見やすく使いやすいUI・UXを重視し、公開されている優れたサービスから学びながら改善を重ねています。"
    "AI駆動開発をメインで行い、アイデアを素早く動く形にすることが強みです。"
)
c.setFillColor(PALE)
c.setStrokeColor(LINE)
c.roundRect(M, y - 31 * mm, CW, 31 * mm, 2.5 * mm, fill=1, stroke=1)
para(profile, M + 5 * mm, y - 4 * mm, CW - 10 * mm, size=8.4, leading=4.8 * mm)
y -= 36 * mm

y = section("技術スキル", y)
skills_intro = (
    "Pythonを約3年間使用し、簡易的なコマンドラインアプリを自力で設計・実装できます。HTML / CSS / JavaScript / TypeScript / React / Next.js / Flutter / Swiftを用いた制作経験があり、"
    "Codexなどの生成AIを活用しつつ、生成されたコードの動作確認・修正・改善を行うAI駆動開発に取り組んでいます。GitHubは個人開発のバージョン管理と成果物公開に継続して使用しています。"
)
para(skills_intro, M, y, CW, size=8.3, leading=4.7 * mm)
y -= 21 * mm

skill_rows = [
    ("Python", "使用歴約3年。簡易的なCLIアプリを自力で設計・実装"),
    ("Web", "HTML / CSS / JavaScript / TypeScript / React / Next.js"),
    ("Mobile", "Flutter / Swiftを用いたモバイルアプリ制作"),
    ("AI / LLM", "OllamaによるローカルLLMアプリ、さくらのAI Engine API、Codex"),
    ("Development", "Git / GitHubによる個人開発、AI支援下での検証・修正・改善"),
]
row_h = 9.2 * mm
for i, (name, desc) in enumerate(skill_rows):
    yy = y - i * row_h
    c.setFillColor(PALE if i % 2 == 0 else WHITE)
    c.setStrokeColor(LINE)
    c.rect(M, yy - row_h, CW, row_h, fill=1, stroke=1)
    c.setFillColor(NAVY)
    c.setFont(JP, 7.8)
    c.drawString(M + 3 * mm, yy - 6.3 * mm, name)
    para(desc, M + 39 * mm, yy - 2.3 * mm, CW - 42 * mm, size=7.7, leading=4 * mm)

c.showPage()


# Page 2
header(2, "技術活動・制作実績", "課題設定、実装、AI活用、UI・UX改善の経験")
y = H - 47 * mm
y = section("SecHack365", y)
c.setFillColor(PALE)
c.setStrokeColor(LINE)
c.roundRect(M, y - 54 * mm, CW, 54 * mm, 2.5 * mm, fill=1, stroke=1)
c.setFillColor(NAVY)
c.setFont(JP, 10)
c.drawString(M + 5 * mm, y - 7 * mm, "SecHack365 2026年度 学習駆動コース 大神ゼミ")
sechack = (
    "学習内容からナレッジグラフを自動生成し、ユーザーの理解度を推定するシステムを開発しています。"
    "理解度と知識の前提関係に基づき、次に学ぶ内容と順序を提案し、一人ひとりの学習計画づくりを支援するシステムの実現を目指します。"
    "展示用WebサイトにはTypeScriptを使用し、さくらインターネットの『さくらのAI Engine』APIによるAI機能を実装しました。"
    "開発ではCodexを活用しながら、機能の実装だけでなく、情報が直感的に伝わるUI・UXの改善にも取り組んでいます。"
)
para(sechack, M + 5 * mm, y - 12 * mm, CW - 10 * mm, size=8.1, leading=4.55 * mm)
url = "https://ktaisei.github.io/sechack365/"
para(f'<link href="{url}" color="#3478F6">{url}</link>', M + 5 * mm, y - 45 * mm, CW - 10 * mm, size=7.3, leading=3.8 * mm, color=BLUE)
c.linkURL(url, (M + 5 * mm, y - 52 * mm, W - M - 5 * mm, y - 45 * mm), relative=0)
y -= 61 * mm

y = section("制作実績", y)
y = card(
    "Stophone - 歩きスマホ防止アプリ",
    "歩行中のスマートフォン利用による危険を減らすために制作したFlutterアプリです。端末の加速度センサーから得た情報と独自アルゴリズムを用いて、歩きながらスマートフォンを操作している状態を検知し、利用者へ警告します。身近な社会課題を、モバイル端末のセンサーとアプリケーションで解決することに挑戦しました。",
    y,
    "https://github.com/KTaisei/stophone",
    37 * mm,
)
y = card(
    "個人ホームページ・ブログ",
    "TypeScriptとGitCMSを利用し、自身の制作物や活動を発信するホームページ・ブログを開発しました。GitCMSの導入により、コードを書くことなく簡単にWebページの内容を編集・更新できる構成を実現しました。情報の見つけやすさ、読みやすさ、画面上の導線を意識してUIを調整しています。",
    y,
    "https://github.com/KTaisei/official",
    37 * mm,
)
y = card(
    "文化祭模擬店 注文管理Webアプリ",
    "文化祭の模擬店で、レジと厨房の間の注文共有を効率化するWebアプリを開発しました。注文状況を双方で確認できるようにし、口頭伝達による行き違いや確認負担を減らすことを目的としました。実際の運営現場を想定し、短時間で確認・操作できることを重視しました。",
    y,
    "https://github.com/KTaisei/Order-Management-System",
    35 * mm,
)

y = section("受賞歴", y)
c.setFillColor(PALE)
c.setStrokeColor(LINE)
c.roundRect(M, y - 22 * mm, CW, 22 * mm, 2.5 * mm, fill=1, stroke=1)
c.setFillColor(NAVY)
c.setFont(JP, 8.7)
c.drawString(M + 5 * mm, y - 7 * mm, "2025年5月25日")
award = "【人工知能学会・日本統計学会公認】全国中高生AI・DS探究コンペティション2025　奨励賞"
para(award, M + 5 * mm, y - 10 * mm, CW - 10 * mm, size=8.2, leading=4.6 * mm)

c.save()
print(OUT)
