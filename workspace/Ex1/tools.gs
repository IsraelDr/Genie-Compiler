[indent=4]

def remove_leading_whitespace(str:string):string
    temp:string=str
    while (temp.length > 0 && (temp[0] == ' '))
        temp = temp.slice(1,temp.length)
    return temp
