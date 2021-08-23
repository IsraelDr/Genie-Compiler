[indent=4]

//------------------------------------------------------------------------------

def label(arr:array of string): string
    translated_content:string=""
    translated_content += "(" + arr[1] + ")" + "    // label" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------

def func_goto(arr:array of string): string
    translated_content:string=""
    translated_content += "@" + arr[1]    + "    // A refers to the lable '" + arr[1] + "'\n"
    translated_content += "0;JMP"         + "    // Always Jumps" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------

def func_if(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"           + "    // A=SP=0" + "\n"
    translated_content += "M=M-1"         + "    // RAM[SP]=RAM[SP]-1" + "\n"
    translated_content += "A=M"           + "    // A=RAM[SP]" + "\n"
    translated_content += "D=M"           + "    // D=RAM[RAM[SP]]=top_most_stack_element" + "\n"
    translated_content += "@" + arr[1]    + "    // A refers to the lable '" + arr[1] + "'\n"
    translated_content += "D;JNE"         + "    // Jumps if top_most_stack_element is not zero" + "\n\n"
    return translated_content
    