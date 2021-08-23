[indent=4]
    
//------------------------------------------------------------------------------

eq_counter:int=0

def eq(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"                                             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"                                           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"                                             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"                                             +  "    // D=M[M[SP]]=second_arg" + "\n"
    translated_content += "A=A-1"                                           +  "    // A=M[SP]-1" + "\n"
    translated_content += "D=M-D"                                           +  "    // D=M[M[SP]-1]-D=first_arg-second_arg=result" + "\n"
    translated_content += "@IS_EQUAL"+eq_counter.to_string()                +  "    // A refers to the lable IS_EQUAL"+eq_counter.to_string() + "\n"
    translated_content += "D;JEQ"                                           +  "    // Jumps if D equals 0" + "\n"
    translated_content += "D=0"                                             +  "    // D=0 means false" + "\n"
    translated_content += "@END_EQUAL"+eq_counter.to_string()               +  "    // A refers to the lable END"+eq_counter.to_string() + "\n"
    translated_content += "0;JMP"                                           +  "    // Always Jumps" + "\n"
    translated_content += "(IS_EQUAL"+eq_counter.to_string()+")"            +  "    // label" + "\n"
    translated_content += "D=-1"                                            +  "    // D=-1 means true" + "\n"
    translated_content += "(END_EQUAL"+eq_counter.to_string()+")"           +  "    // label" + "\n"
    translated_content += "@SP"                                             +  "    // A=SP=0" + "\n"
    translated_content += "A=M-1"                                           +  "    // A=M[SP]-1" + "\n"
    translated_content += "M=D"                                             +  "    // M[M[SP]-1]=D=true/false" + "\n\n"
    eq_counter=eq_counter+1
    return translated_content

//------------------------------------------------------------------------------    
    
gt_counter:int=0

def gt(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"                                             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"                                           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"                                             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"                                             +  "    // D=M[M[SP]]=second_arg" + "\n"
    translated_content += "A=A-1"                                           +  "    // A=M[SP]-1" + "\n"
    translated_content += "D=M-D"                                           +  "    // D=M[M[SP]-1]-D=first_arg-second_arg=result" + "\n"
    translated_content += "@IS_GREATER"+gt_counter.to_string()              +  "    // A refers to the lable IS_GREATER"+eq_counter.to_string() + "\n"
    translated_content += "D;JGT"                                           +  "    // Jumps if D grester then 0" + "\n"
    translated_content += "D=0"                                             +  "    // D=0 means false" + "\n"
    translated_content += "@END_GREATER"+gt_counter.to_string()             +  "    // A refers to the lable END"+gt_counter.to_string() + "\n"
    translated_content += "0;JMP"                                           +  "    // Always Jumps" + "\n"
    translated_content += "(IS_GREATER"+gt_counter.to_string()+")"          +  "    // label" + "\n"
    translated_content += "D=-1"                                            +  "    // D=-1 means true" + "\n"
    translated_content += "(END_GREATER"+gt_counter.to_string()+")"         +  "    // label" + "\n"
    translated_content += "@SP"                                             +  "    // A=SP=0" + "\n"
    translated_content += "A=M-1"                                           +  "    // A=M[SP]-1" + "\n"
    translated_content += "M=D"                                             +  "    // M[M[SP]-1]=D=true/false" + "\n\n"
    gt_counter=gt_counter+1
    return translated_content
    
//------------------------------------------------------------------------------
    
lt_counter:int=0

def lt(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"                                             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"                                           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"                                             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"                                             +  "    // D=M[M[SP]]=second_arg" + "\n"
    translated_content += "A=A-1"                                           +  "    // A=M[SP]-1" + "\n"
    translated_content += "D=M-D"                                           +  "    // D=M[M[SP]-1]-D=first_arg-second_arg=result" + "\n"
    translated_content += "@IS_LESS"+lt_counter.to_string()                 +  "    // A refers to the lable IS_LESS"+lt_counter.to_string() + "\n"
    translated_content += "D;JLT"                                           +  "    // Jumps if D less then 0" + "\n"
    translated_content += "D=0"                                             +  "    // D=0 means false" + "\n"
    translated_content += "@END_LESS"+lt_counter.to_string()                +  "    // A refers to the lable END"+lt_counter.to_string() + "\n"
    translated_content += "0;JMP"                                           +  "    // Always Jumps" + "\n"
    translated_content += "(IS_LESS"+lt_counter.to_string()+")"             +  "    // label" + "\n"
    translated_content += "D=-1"                                            +  "    // D=-1 means true" + "\n"
    translated_content += "(END_LESS"+lt_counter.to_string()+")"                 +  "    // label" + "\n"
    translated_content += "@SP"                                             +  "    // A=SP=0" + "\n"
    translated_content += "A=M-1"                                           +  "    // A=M[SP]-1" + "\n"
    translated_content += "M=D"                                             +  "    // M[M[SP]-1]=D=true/false" + "\n\n"
    lt_counter=lt_counter+1
    return translated_content
    
//------------------------------------------------------------------------------
    
def And(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]=" + "\n"
    translated_content += "D=M"             +  "    // D=M[M[SP]]=second_arg" + "\n"
    translated_content += "A=A-1"           +  "    // A=M[SP]-1" + "\n"
    translated_content += "D=D&M"           +  "    // D=second_arg&M[M[SP]-1]=second_arg&first_arg=result" + "\n"
    translated_content += "M=D"             +  "    // M[M[SP]-1]=D=result" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def Or(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"             +  "    // D=M[M[SP]]=second_arg" + "\n"
    translated_content += "A=A-1"           +  "    // A=M[SP]-1" + "\n"
    translated_content += "D=D|M"           +  "    // D=second_arg|M[M[SP]-1]=second_arg|first_arg=result" + "\n"
    translated_content += "M=D"             +  "    // M[M[SP]-1]=D=result" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def Not(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "A=M-1"           +  "    // A=M[SP]-1" + "\n"
    translated_content += "M=!M"             +  "    // M[M[SP]-1]=!M[M[SP]-1]" + "\n\n"
    return translated_content
    