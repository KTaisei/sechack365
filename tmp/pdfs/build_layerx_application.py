from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output" / "pdf" / "LayerX_hackathon_application_editable.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = A4
MARGIN = 15 * mm
CONTENT_W = PAGE_W - 2 * MARGIN
NAVY = colors.HexColor("#13233A")
BLUE = colors.HexColor("#3478F6")
PALE = colors.HexColor("#F3F7FC")
LINE = colors.HexColor("#C8D3E0")
TEXT = colors.HexColor("#1D2733")
MUTED = colors.HexColor("#65758B")

JP_FONT_PATH = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
pdfmetrics.registerFont(TTFont("ArialUnicode", JP_FONT_PATH))
JP = "ArialUnicode"

c = canvas.Canvas(str(OUT), pagesize=A4)
c.setTitle("LayerX AI Agent Hackathon - Application Profile")
c.setAuthor("Application draft")
form = c.acroForm


def p(text, x, y_top, width, size=8.5, leading=None, color=TEXT, bold=False):
    style = ParagraphStyle(
        "jp",
        fontName=JP,
        fontSize=size,
        leading=leading or size * 1.45,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=0,
    )
    para = Paragraph(text, style)
    _, h = para.wrap(width, PAGE_H)
    para.drawOn(c, x, y_top - h)
    return h


def header(page_no, title, subtitle):
    c.setFillColor(NAVY)
    c.rect(0, PAGE_H - 39 * mm, PAGE_W, 39 * mm, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.roundRect(MARGIN, PAGE_H - 17 * mm, 42 * mm, 6 * mm, 3 * mm, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont(JP, 7.5)
    c.drawCentredString(MARGIN + 21 * mm, PAGE_H - 15.2 * mm, "LayerX Hackathon 2026")
    c.setFont(JP, 18)
    c.drawString(MARGIN, PAGE_H - 27 * mm, title)
    c.setFillColor(colors.HexColor("#B9C7DA"))
    c.setFont(JP, 8)
    c.drawString(MARGIN, PAGE_H - 34 * mm, subtitle)
    c.setFillColor(MUTED)
    c.setFont(JP, 7)
    c.drawRightString(PAGE_W - MARGIN, 8 * mm, f"{page_no} / 3  |  Editable application draft")


def section(title, y):
    c.setFillColor(BLUE)
    c.roundRect(MARGIN, y - 6 * mm, 2.2 * mm, 6 * mm, 1.1 * mm, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont(JP, 11)
    c.drawString(MARGIN + 5 * mm, y - 4.7 * mm, title)
    return y - 10 * mm


def label(text, x, y):
    c.setFillColor(MUTED)
    c.setFont(JP, 7.2)
    c.drawString(x, y, text)


def field(name, x, y_top, width, height=9 * mm, multiline=False, tooltip=""):
    flags = 4096 if multiline else 0
    form.textfield(
        name=name,
        tooltip=tooltip or name,
        x=x,
        y=y_top - height,
        width=width,
        height=height,
        borderStyle="solid",
        borderWidth=0.7,
        borderColor=LINE,
        fillColor=colors.white,
        textColor=TEXT,
        forceBorder=True,
        fontName="Helvetica",
        fontSize=8,
        fieldFlags=flags,
    )


def note_box(text, x, y_top, width, height):
    c.setFillColor(PALE)
    c.setStrokeColor(colors.HexColor("#DDE7F2"))
    c.roundRect(x, y_top - height, width, height, 2.5 * mm, fill=1, stroke=1)
    p(text, x + 4 * mm, y_top - 3 * mm, width - 8 * mm, size=8, color=TEXT)


# Page 1
header(1, "応募プロフィール", "基本情報・学歴・スキルを1ページで把握できる構成")
y = PAGE_H - 48 * mm
y = section("基本情報", y)
gap = 5 * mm
left_w = 75 * mm
right_x = MARGIN + left_w + gap
right_w = CONTENT_W - left_w - gap
label("氏名", MARGIN, y)
label("氏名（ローマ字）", right_x, y)
field("full_name", MARGIN, y - 2 * mm, left_w)
field("name_roman", right_x, y - 2 * mm, right_w)
y -= 16 * mm
label("メールアドレス", MARGIN, y)
label("電話番号", right_x, y)
field("email", MARGIN, y - 2 * mm, left_w)
field("phone", right_x, y - 2 * mm, right_w)
y -= 17 * mm

y = section("学歴", y)
label("大学・学部・学科 / 専攻", MARGIN, y)
field("university_department", MARGIN, y - 2 * mm, CONTENT_W)
y -= 15 * mm
label("在学期間・卒業予定年月", MARGIN, y)
field("education_period", MARGIN, y - 2 * mm, CONTENT_W)
y -= 17 * mm

y = section("技術スキル", y)
note_box(
    "<b>会話から反映した方針：</b> Git・TypeScriptの基礎と、実際に「動くもの」を作った経験が伝わるようにします。単なる技術名の列挙ではなく、制作物での利用経験を記入してください。",
    MARGIN, y, CONTENT_W, 18 * mm,
)
y -= 22 * mm
label("言語・フレームワーク・ツール（例：TypeScript - 個人開発で使用 / Git・GitHub - チーム開発で使用）", MARGIN, y)
field("technical_skills", MARGIN, y - 2 * mm, CONTENT_W, 25 * mm, multiline=True)
y -= 34 * mm

y = section("プロフィール要約", y)
note_box(
    "大学での学びに加え、SecHack365や制作活動を通じて、課題を発見し、技術で動く形にする経験を積んできました。今回のハッカソンでは、AI Agentによる業務課題の解決と、LayerXの高速なプロダクト開発の考え方を学びたいと考えています。",
    MARGIN, y, CONTENT_W, 24 * mm,
)
y -= 28 * mm
label("上記を自分の言葉に直したプロフィール（PDF上で入力）", MARGIN, y)
field("profile_summary", MARGIN, y - 2 * mm, CONTENT_W, 24 * mm, multiline=True)

c.showPage()


# Page 2
header(2, "技術活動・制作実績", "SecHack365、個人開発、研究、インターン等から重要なものを優先")
y = PAGE_H - 48 * mm
y = section("SecHack365", y)
note_box(
    "参加年度・コース名だけでなく、解いた課題、制作したもの、自分の担当、改善の過程、成果を記載します。メンターからのフィードバックをどう反映したかも有効です。",
    MARGIN, y, CONTENT_W, 17 * mm,
)
y -= 22 * mm
label("年度・ゼミ / トラック・活動期間", MARGIN, y)
field("sechack_program", MARGIN, y - 2 * mm, CONTENT_W)
y -= 15 * mm
label("取り組んだ課題・制作物の概要", MARGIN, y)
field("sechack_overview", MARGIN, y - 2 * mm, CONTENT_W, 25 * mm, multiline=True)
y -= 33 * mm
label("自分の担当・技術的な工夫・フィードバックを受けた改善", MARGIN, y)
field("sechack_contribution", MARGIN, y - 2 * mm, CONTENT_W, 31 * mm, multiline=True)
y -= 39 * mm
label("使用技術・成果URL", MARGIN, y)
field("sechack_stack_url", MARGIN, y - 2 * mm, CONTENT_W, 14 * mm, multiline=True)
y -= 22 * mm

y = section("制作実績 / 個人開発 / 研究", y)
label("プロジェクト名・期間・URL", MARGIN, y)
field("project_title", MARGIN, y - 2 * mm, CONTENT_W)
y -= 15 * mm
label("誰のどんな課題を、何によって解決したか", MARGIN, y)
field("project_problem_solution", MARGIN, y - 2 * mm, CONTENT_W, 24 * mm, multiline=True)
y -= 32 * mm
label("担当・使用技術・工夫・結果（利用者数、速度改善、公開実績など）", MARGIN, y)
field("project_details", MARGIN, y - 2 * mm, CONTENT_W, 26 * mm, multiline=True)

c.showPage()


# Page 3
header(3, "受賞歴・応募動機・リンク", "実績の背景とLayerXへの接続を簡潔に伝える")
y = PAGE_H - 48 * mm
y = section("受賞歴", y)
note_box(
    "賞名だけでなく、対象となった作品、応募規模（確認できる場合）、自分の担当を書きます。チーム受賞の場合は担当範囲を明記してください。",
    MARGIN, y, CONTENT_W, 17 * mm,
)
y -= 22 * mm
label("受賞1：年月 / 賞名 / 対象作品 / 担当 / 規模", MARGIN, y)
field("award_1", MARGIN, y - 2 * mm, CONTENT_W, 24 * mm, multiline=True)
y -= 32 * mm
label("受賞2：年月 / 賞名 / 対象作品 / 担当 / 規模", MARGIN, y)
field("award_2", MARGIN, y - 2 * mm, CONTENT_W, 24 * mm, multiline=True)
y -= 34 * mm

y = section("応募の背景", y)
note_box(
    "<b>たたき台：</b> これまでの開発経験を生かし、身近な不自由をAI Agentで解決するプロダクトづくりに挑戦したいと考え、応募しました。短期間で本当に必要な価値を形にするLayerXの思考プロセスを、トップエンジニアからのフィードバックを通じて学びたいです。",
    MARGIN, y, CONTENT_W, 25 * mm,
)
y -= 30 * mm
label("自分の経験と結びつけた応募動機（フォーム本体にも転用可能）", MARGIN, y)
field("motivation", MARGIN, y - 2 * mm, CONTENT_W, 31 * mm, multiline=True)
y -= 39 * mm

y = section("リンク", y)
label("GitHub（応募フォームでも必須）", MARGIN, y)
field("github_url", MARGIN, y - 2 * mm, CONTENT_W)
y -= 15 * mm
label("ポートフォリオ / デモ / 発表資料 / 紹介記事", MARGIN, y)
field("portfolio_urls", MARGIN, y - 2 * mm, CONTENT_W, 14 * mm, multiline=True)
y -= 22 * mm

y = section("提出前チェック", y)
p(
    "□ GitHubの代表リポジトリにREADMEがある　　□ リンクが閲覧可能　　□ 受賞歴の年月・名称が正確<br/>"
    "□ TypeScript / Gitの経験が確認できる　　□ チーム成果と自分の担当を区別　　□ 空欄や記入例を削除",
    MARGIN, y, CONTENT_W, size=7.7, leading=4.7 * mm,
)

c.save()
print(OUT)
