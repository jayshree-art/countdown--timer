from tkinter import *
from tkinter import ttk

win =Tk()
win.title("wether site")

win.config(bg= "blue")
win.geometry("500x550")


name_label = Label ( win,text="wether app",font=("Time New Roman", 40, "bold"))
name_label.place(x=25,y=50,height=50,width=450)



list_name=['new york','india','america','usa','itali']
com=ttk.Combobox(win,text="wether app",values=list_name,font=("Time New Roman", 15))
com.place(x=25,y=120,height=50,width=450)



W_label = Label ( win,text="climate",font=("Time New Roman", 10))
W_label.place(x=25,y=260,height=50,width=100)
W_label1 = Label ( win,text="",font=("Time New Roman", 10))
W_label1.place(x=250,y=260,height=50,width=210)


d_label = Label ( win,text="discription",font=("Time New Roman", 10))
d_label.place(x=25,y=330,height=50,width=100)
d_label1 = Label ( win,text="",font=("Time New Roman", 10))
d_label1.place(x=250,y=330,height=50,width=210)



t_label = Label ( win,text="temprature",font=("Time New Roman", 10))
t_label.place(x=25,y=400,height=50,width=100)
t_label = Label ( win,text="",font=("Time New Roman", 10))
t_label.place(x=250,y=400,height=50,width=210)


p_label = Label ( win,text="pressure",font=("Time New Roman", 10))
p_label.place(x=25,y=480,height=50,width=100)
p_label = Label ( win,text="",font=("Time New Roman", 10))
p_label.place(x=250,y=480,height=50,width=210)





done_button= Button(win,text="done",font=("Time New Roman", 25))
done_button.place(x=200,y=190,height=50,width=100)




win.mainloop()