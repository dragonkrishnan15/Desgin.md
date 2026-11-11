import math
import os
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_master_storyboard(output_path="D:/Library1/website/intro-scenes-collage.png"):
    W, H = 2560, 1440
    img = Image.new("RGBA", (W, H), (7, 10, 18, 255))
    draw = ImageDraw.Draw(img)

    try:
        title_font = ImageFont.truetype("arialbd.ttf", 36)
        sub_font = ImageFont.truetype("arial.ttf", 19)
        badge_font = ImageFont.truetype("arialbd.ttf", 14)
        card_title_font = ImageFont.truetype("arialbd.ttf", 19)
        card_sub_font = ImageFont.truetype("arial.ttf", 14)
        meta_font = ImageFont.truetype("arial.ttf", 13)
        wordmark_font = ImageFont.truetype("arialbd.ttf", 22)
    except Exception:
        title_font = ImageFont.load_default()
        sub_font = title_font
        badge_font = title_font
        card_title_font = title_font
        card_sub_font = title_font
        meta_font = title_font
        wordmark_font = title_font

    # Ambient studio radial gradient
    for r in range(1200, 0, -35):
        alpha = int(24 * (1 - r / 1200))
        draw.ellipse([W//2 - r, H//2 - int(r*0.65), W//2 + r, H//2 + int(r*0.65)], fill=(15, 23, 42, alpha))

    # Header Bar
    badge_rect = [W//2 - 160, 32, W//2 + 160, 62]
    draw.rounded_rectangle(badge_rect, radius=15, fill=(15, 23, 42, 240), outline=(191, 227, 255, 140))
    draw.text((W//2, 47), "STYLELAB CHROME EMBLEM LOADER v2", font=badge_font, fill=(191, 227, 255), anchor="mm")

    draw.text((W//2, 92), "Storyboards A & B Synthesis · Wispy Shader Smoke, Bottom-Up Formation & Chrome Sheen Wipe", font=title_font, fill=(248, 250, 252), anchor="mm")
    draw.text((W//2, 128), "Monochrome Visual Discipline: White Canvas · Graphite Smoke · Polished Silver Chrome · Ice-Blue (#BFE3FF) Specular Sheen", font=sub_font, fill=(148, 163, 184), anchor="mm")

    # Layout Grid: 4 columns x 2 rows
    margin_x = 75
    margin_top = 168
    gap_x = 32
    gap_y = 36
    cols = 4
    rows = 2
    card_w = (W - 2 * margin_x - (cols - 1) * gap_x) // cols
    card_h = (H - margin_top - 85 - (rows - 1) * gap_y) // rows

    scenes = [
        {
            "id": "01",
            "name": "WISPY SMOKE IN",
            "time": "0.0s – 1.0s",
            "desc": "Domain-warped fractal noise shader ribbons drift in; soft curling tendrils, zero bubbles",
            "type": "smoke"
        },
        {
            "id": "02",
            "name": "BOTTOM-UP MATERIALIZE",
            "time": "1.0s – 2.4s",
            "desc": "Chrome forms bottom-up inside smoke via traveling gradient mask with 12px blur edge",
            "type": "materialize"
        },
        {
            "id": "03",
            "name": "UNFURL",
            "time": "2.4s – 3.2s",
            "desc": "Wings fan open from +55° to +8°; 40ms cascade lag across 7 feathers, crest springs up",
            "type": "unfurl"
        },
        {
            "id": "04",
            "name": "FLAP 1: DOWNSTROKE",
            "time": "3.2s – 4.15s",
            "desc": "Fast 0.285s power stroke (-22°), aero tip bend (+10°), specular highlight streak sweep",
            "type": "flap1"
        },
        {
            "id": "05",
            "name": "HERO CLOSE-UP",
            "time": "4.15s – 5.1s",
            "desc": "1.45x macro camera zoom into left wing tips; specular sheen slides across chrome feathers",
            "type": "flap2"
        },
        {
            "id": "06",
            "name": "FLAP 3 & WORDMARK",
            "time": "5.1s – 6.05s",
            "desc": "140% excursion, 30px lift, tail whip, 4 diamond glints blaze, StyleLab wordmark fades in",
            "type": "flap3"
        },
        {
            "id": "07",
            "name": "DISSOLVE & SHEEN WIPE",
            "time": "6.05s – 7.1s",
            "desc": "Emblem dissolves into 900 silver dust particles; 105° chrome sheen band wipes canvas",
            "type": "burst"
        },
        {
            "id": "08",
            "name": "REVEAL & STUDIO UI",
            "time": "7.1s – 7.8s",
            "desc": "Wipe band clears white layer; colorful StyleLab theme design studio staggers in",
            "type": "reveal"
        }
    ]

    def draw_chrome_emblem(canvas, cx, cy, wing_angle, feather_extra, lift, scale=0.48, alpha=255, glints=False, mask_progress=1.0, close_up=False):
        if close_up:
            scale *= 1.48
            cx += int(115 * scale)
            cy += int(35 * scale)

        shadow_w = int(240 * scale * (1 - 0.12 * abs(lift)/30))
        shadow_h = int(16 * scale)
        if mask_progress > 0.4:
            canvas.ellipse([cx - shadow_w, cy + 90*scale - shadow_h, cx + shadow_w, cy + 90*scale + shadow_h], fill=(2, 4, 8, int(alpha * 0.42)))

        ecy = cy - int(lift * scale * 1.5)

        for sign in [-1, 1]:
            sh_x = cx + sign * int(60 * scale)
            sh_y = ecy - int(15 * scale)

            num_feathers = 7
            for i in range(num_feathers):
                lag_ratio = (num_feathers - i) / num_feathers
                base_angle = math.radians(-140 + i * 16) if sign == -1 else math.radians(-40 - i * 16)
                cur_angle = base_angle + sign * math.radians(wing_angle + lag_ratio * feather_extra)
                feather_len = int((192 - i * 14) * scale)

                tip_x = sh_x + math.cos(cur_angle) * feather_len
                tip_y = sh_y + math.sin(cur_angle) * feather_len

                if mask_progress < 1.0:
                    rel_y = (tip_y - (cy - 120*scale)) / (240*scale)
                    if 1.0 - rel_y > mask_progress:
                        continue

                ctrl_angle = cur_angle - sign * math.radians(20)
                ctrl_x = sh_x + math.cos(ctrl_angle) * (feather_len * 0.6)
                ctrl_y = sh_y + math.sin(ctrl_angle) * (feather_len * 0.6)

                p1 = (sh_x, sh_y)
                p2 = (int(ctrl_x), int(ctrl_y))
                p3 = (int(tip_x), int(tip_y))
                p4 = (int(ctrl_x - sign * 15 * scale), int(ctrl_y + 12 * scale))

                # Deep black ambient shadow between feathers
                canvas.polygon([(p1[0]+1, p1[1]+2), (p2[0]+1, p2[1]+2), (p3[0]+1, p3[1]+2), (p4[0]+1, p4[1]+2)], fill=(2, 4, 8, int(alpha*0.85)))

                # Chrome silver metallic shading
                col_stop = int(185 + 70 * math.sin(i * 1.25 + wing_angle * 0.05))
                col_stop = max(35, min(252, col_stop))
                feather_col = (col_stop, col_stop + 3, col_stop + 12, alpha)

                canvas.polygon([p1, p2, p3, p4], fill=feather_col, outline=(5, 8, 17, alpha))
                # Ice blue specular rim
                canvas.line([p1, p3], fill=(191, 227, 255, int(alpha * 0.95)), width=max(1, int(2 * scale)))
                canvas.line([(p1[0], p1[1]-1), (p3[0], p3[1]-1)], fill=(255, 255, 255, alpha), width=1)

                if glints and i < 4 and alpha > 100:
                    gx, gy = int(tip_x), int(tip_y)
                    glint_size = int(14 * scale)
                    # Glint bloom
                    canvas.ellipse([gx - 10, gy - 10, gx + 10, gy + 10], fill=(191, 227, 255, 130))
                    canvas.line([gx - glint_size, gy, gx + glint_size, gy], fill=(255, 255, 255, 255), width=2)
                    canvas.line([gx, gy - glint_size, gx, gy + glint_size], fill=(255, 255, 255, 255), width=2)
                    canvas.ellipse([gx - 3, gy - 3, gx + 3, gy + 3], fill=(255, 255, 255, 255))

            # Shoulder shield
            shield_r = int(24 * scale)
            canvas.ellipse([sh_x - shield_r, sh_y - shield_r, sh_x + shield_r, sh_y + shield_r], fill=(210, 220, 235, alpha), outline=(5, 8, 17, alpha))
            canvas.ellipse([sh_x - 3, sh_y - 3, sh_x + 3, sh_y + 3], fill=(255, 255, 255, alpha))

        # Central Torso & S-curve chest
        torso_pts = [
            (cx, ecy - int(45 * scale)),
            (cx + int(18 * scale), ecy - int(10 * scale)),
            (cx + int(22 * scale), ecy + int(45 * scale)),
            (cx, ecy + int(85 * scale)),
            (cx - int(22 * scale), ecy + int(45 * scale)),
            (cx - int(18 * scale), ecy - int(10 * scale)),
        ]
        canvas.polygon(torso_pts, fill=(190, 200, 215, alpha), outline=(5, 8, 17, alpha))
        canvas.line([torso_pts[0], torso_pts[3]], fill=(255, 255, 255, alpha), width=max(1, int(2 * scale)))

        beak_pts = [
            (cx + int(5 * scale), ecy - int(38 * scale)),
            (cx + int(26 * scale), ecy - int(33 * scale)),
            (cx + int(10 * scale), ecy - int(28 * scale)),
        ]
        canvas.polygon(beak_pts, fill=(255, 255, 255, alpha), outline=(5, 8, 17, alpha))

        # Crest spikes (5 spikes)
        crest_base_y = ecy - int(45 * scale)
        for c_i in range(-2, 3):
            spike_h = int((38 - abs(c_i) * 7) * scale)
            c_tip_x = cx + int(c_i * 10 * scale)
            c_tip_y = crest_base_y - spike_h
            canvas.line([(cx, crest_base_y), (c_tip_x, c_tip_y)], fill=(245, 250, 255, alpha), width=max(1, int(2 * scale)))

        # Tail filigrees
        tail_base_y = ecy + int(80 * scale)
        for t_sign in [-1, 1]:
            tail_tip_x = cx + t_sign * int(38 * scale)
            tail_tip_y = tail_base_y + int(45 * scale)
            canvas.line([(cx, tail_base_y), (tail_tip_x, tail_tip_y)], fill=(190, 205, 225, alpha), width=max(1, int(3 * scale)))

    # Render Panels
    for idx, sc in enumerate(scenes):
        row = idx // cols
        col = idx % cols
        x = margin_x + col * (card_w + gap_x)
        y = margin_top + row * (card_h + gap_y)

        draw.rounded_rectangle([x, y, x + card_w, y + card_h], radius=16, fill=(13, 17, 28, 240), outline=(51, 65, 85, 180), width=1)

        vp_pad = 12
        vp_top = y + 46
        vp_w = card_w - 2 * vp_pad
        vp_h = card_h - 46 - 60
        vp_rect = [x + vp_pad, vp_top, x + vp_pad + vp_w, vp_top + vp_h]

        draw.text((x + 18, y + 24), f"SCENE {sc['id']} · {sc['name']}", font=card_title_font, fill=(241, 245, 249), anchor="lm")
        draw.rounded_rectangle([x + card_w - 116, y + 14, x + card_w - 16, y + 36], radius=10, fill=(15, 23, 42, 220), outline=(191, 227, 255, 90))
        draw.text((x + card_w - 66, y + 25), sc["time"], font=badge_font, fill=(191, 227, 255), anchor="mm")

        # White photographic canvas inside viewport
        draw.rounded_rectangle(vp_rect, radius=10, fill=(255, 255, 255, 255))

        cx = vp_rect[0] + vp_w // 2
        cy = vp_rect[1] + vp_h // 2 + 10

        stype = sc["type"]
        if stype == "smoke":
            # Real wispy curl noise smoke ribbons
            for curve_i in range(22):
                curve_pts = []
                startX = vp_rect[0] + (curve_i % 2) * vp_w
                startY = vp_rect[1] + (curve_i * 20) % vp_h
                for s in range(32):
                    t = s / 32.0
                    px = startX + (cx - startX) * t * 0.72 + math.sin(t * 8 + curve_i) * 36
                    py = startY + (cy - startY) * t * 0.72 + math.cos(t * 6 + curve_i) * 26
                    curve_pts.append((px, py))
                for pt_i in range(len(curve_pts) - 1):
                    alpha_wisp = int(38 * (1 - pt_i / len(curve_pts)))
                    draw.line([curve_pts[pt_i], curve_pts[pt_i+1]], fill=(12, 15, 22, alpha_wisp), width=curve_i % 3 + 2)

        elif stype == "materialize":
            # Condensing wisps + bottom-up mask
            for curve_i in range(14):
                curve_pts = []
                startX = vp_rect[0] + (curve_i % 2) * vp_w
                startY = vp_rect[1] + (curve_i * 22) % vp_h
                for s in range(26):
                    t = s / 26.0
                    px = startX + (cx - startX) * t * 0.9 + math.sin(t * 6 + curve_i) * 20
                    py = startY + (cy - startY) * t * 0.9 + math.cos(t * 6 + curve_i) * 15
                    curve_pts.append((px, py))
                for pt_i in range(len(curve_pts) - 1):
                    draw.line([curve_pts[pt_i], curve_pts[pt_i+1]], fill=(15, 18, 26, 42), width=3)
            # Chrome forms bottom-up (mask progress 60%)
            draw_chrome_emblem(draw, cx, cy, wing_angle=55, feather_extra=0, lift=0, alpha=240, mask_progress=0.6)

        elif stype == "unfurl":
            draw_chrome_emblem(draw, cx, cy, wing_angle=18, feather_extra=4, lift=-3, alpha=255)

        elif stype == "flap1":
            draw_chrome_emblem(draw, cx, cy, wing_angle=-22, feather_extra=12, lift=6, alpha=255)
            # Specular streak overlay
            draw.line([cx - 130, cy - 20, cx - 40, cy + 30], fill=(255, 255, 255, 220), width=3)
            draw.line([cx + 40, cy + 30, cx + 130, cy - 20], fill=(255, 255, 255, 220), width=3)

        elif stype == "flap2":
            # 1.48x Hero Macro Zoom on left wing tips
            draw_chrome_emblem(draw, cx, cy, wing_angle=-18, feather_extra=10, lift=12, alpha=255, close_up=True)
            draw.text((vp_rect[0] + 16, vp_rect[3] - 22), "1.48x Specular Macro Push-In", font=badge_font, fill=(15, 23, 42))

        elif stype == "flap3":
            draw_chrome_emblem(draw, cx, cy, wing_angle=-26, feather_extra=15, lift=30, alpha=255, glints=True)
            # Wordmark StyleLab
            draw.text((cx, cy + int(92 * 0.48)), "STYLELAB", font=wordmark_font, fill=(15, 23, 42), anchor="mm")

        elif stype == "burst":
            # 900 Silver Dust Dissolve particles
            random.seed(88)
            for _ in range(280):
                px = cx + random.randint(-165, 165)
                py = cy + random.randint(-85, 85)
                sr = random.randint(1, 3)
                col = random.choice([(255, 255, 255), (191, 227, 255), (226, 232, 240), (148, 163, 184)])
                draw.ellipse([px - sr, py - sr, px + sr, py + sr], fill=col)
            # 105 deg Chrome Sheen Wipe Band
            wipe_x = cx - 20
            sheen_poly = [
                (wipe_x - 30, vp_rect[1]),
                (wipe_x + 40, vp_rect[1]),
                (wipe_x + 10, vp_rect[3]),
                (wipe_x - 60, vp_rect[3])
            ]
            draw.polygon(sheen_poly, fill=(191, 227, 255, 205), outline=(255, 255, 255, 255))
            draw.line([(wipe_x + 5, vp_rect[1]), (wipe_x - 25, vp_rect[3])], fill=(255, 255, 255, 255), width=3)

        elif stype == "reveal":
            # Live StyleLab Studio UI underneath
            draw.rounded_rectangle(vp_rect, radius=10, fill=(11, 12, 16, 255))
            # Header
            draw.rectangle([vp_rect[0], vp_rect[1], vp_rect[2], vp_rect[1] + 28], fill=(18, 22, 34, 255))
            draw.text((vp_rect[0] + 15, vp_rect[1] + 14), "StyleLab Studio", font=meta_font, fill=(241, 245, 249), anchor="lm")
            # Cards
            card1 = [vp_rect[0] + 15, vp_rect[1] + 38, vp_rect[0] + 160, vp_rect[3] - 15]
            card2 = [vp_rect[0] + 175, vp_rect[1] + 38, vp_rect[2] - 15, vp_rect[3] - 15]
            draw.rounded_rectangle(card1, radius=6, fill=(24, 30, 46, 255), outline=(56, 189, 248, 120))
            draw.rounded_rectangle(card2, radius=6, fill=(24, 30, 46, 255), outline=(148, 163, 184, 80))
            draw.text((card1[0] + 12, card1[1] + 20), "Theme Tokens", font=meta_font, fill=(56, 189, 248), anchor="lm")
            draw.text((card2[0] + 12, card2[1] + 20), "Live Blueprint", font=meta_font, fill=(226, 232, 240), anchor="lm")

            # Exiting sheen band at right edge
            exit_x = vp_rect[2] - 25
            sheen_poly = [
                (exit_x - 15, vp_rect[1]),
                (exit_x + 15, vp_rect[1]),
                (exit_x - 5, vp_rect[3]),
                (exit_x - 35, vp_rect[3])
            ]
            draw.polygon(sheen_poly, fill=(191, 227, 255, 140))

        draw.text((x + 16, y + card_h - 26), sc["desc"], font=card_sub_font, fill=(148, 163, 184), anchor="lm")

    # Bottom footer stats
    draw.line([margin_x, H - 42, W - margin_x, H - 42], fill=(30, 41, 59, 200), width=1)
    footer_text = "StyleLab Revision v2 · WebGL Domain-Warped Smoke · Bottom-Up Gradient Mask · Hero Macro Push-In · Silver Dust Dissolve & Chrome Sheen Wipe"
    draw.text((W//2, H - 22), footer_text, font=meta_font, fill=(100, 116, 139), anchor="mm")

    img.save(output_path, "PNG", quality=95)
    print(f"Master storyboard successfully generated and saved to {output_path}")

if __name__ == "__main__":
    create_master_storyboard()
