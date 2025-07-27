from datetime import datetime
from dateutil.relativedelta import relativedelta
from pystray import Icon, MenuItem, Menu
from PIL import Image, ImageDraw
import threading
import time
import tkinter as tk

# target date : year,month,day,hours,minutes,seconds
target_date = datetime(2026, 1, 1, 0, 0, 0)

def create_image():
    image = Image.new('RGB', (64, 64), color=(58, 0, 133))
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, 64, 64), fill=(120, 30, 255))
    draw.text((10, 25), 'CD', fill="white")
    return image

def get_countdown():
    now = datetime.now()
    if now >= target_date:
        return "00:00:00:00:00:00"
    diff = relativedelta(target_date, now)
    return (
        f"{diff.years:02d}:"
        f"{diff.months:02d}:"
        f"{diff.days:02d}:"
        f"{diff.hours:02d}:"
        f"{diff.minutes:02d}:"
        f"{diff.seconds:02d}"
    )

def update_tooltip(icon):
    while icon.visible:
        icon.title = f"Countdown: {get_countdown()}"
        time.sleep(1)

def quit_all(icon, root):
    icon.stop()
    root.quit()

def run_tray_and_popup():
    # Tkinter popup
    root = tk.Tk()
    root.title("Countdown Timer")
    label = tk.Label(root, font=("Arial", 24))
    label.pack(padx=20, pady=20)

    def update_label():
        label.config(text=f"Countdown: {get_countdown()}")
        root.after(1000, update_label)

    # Tray icon
    icon = Icon(
        "Countdown",
        create_image(),
        "Countdown: Loading ....",
        menu=Menu(MenuItem('Quit', lambda: quit_all(icon, root)))
    )

    # Start tray icon in a thread
    threading.Thread(target=icon.run, daemon=True).start()
    threading.Thread(target=update_tooltip, args=(icon,), daemon=True).start()

    # When popup is closed, quit tray icon too
    root.protocol("WM_DELETE_WINDOW", lambda: quit_all(icon, root))

    update_label()
    root.mainloop()

if __name__ == "__main__":
    run_tray_and_popup()