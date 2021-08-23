[indent=4]

//------------------------------------------------------------------------------

def add(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"             +  "    // D=M[A]=second_arg" + "\n"
    translated_content += "A=A-1"           +  "    // A=A-1" + "\n"
    translated_content += "D=D+M"           +  "    // D=D+M[A]=second_arg+first_arg=result" + "\n"
    translated_content += "M=D"             +  "    // M[A]=D=result" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def sub(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"             +  "    // D=M[A]=second_arg" + "\n"
    translated_content += "A=A-1"           +  "    // A=A-1" + "\n"
    translated_content += "D=M-D"           +  "    // D=M[A]-D=first_arg-second_arg=result" + "\n"
    translated_content += "M=D"             +  "    // M[A]=D=result" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def neg(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "A=M-1"           +  "    // A=M[SP]-1" + "\n"
    translated_content += "M=-M"             +  "   // M[M[SP]-1]=-M[M[SP]-1]" + "\n\n"
    return translated_content
    