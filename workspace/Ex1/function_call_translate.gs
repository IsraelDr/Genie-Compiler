[indent=4]

ReturnAddress_counter:int=0

//------------------------------------------------------------------------------

def call(arr:array of string): string
    translated_content:string=""
    translated_content+= "//push "+arr[1]+".ReturnAddress"+ReturnAddress_counter.to_string()+"\n"
    translated_content+=push_constant({"_push_","_constant_",arr[1]+".ReturnAddress"+ReturnAddress_counter.to_string()})
    
    translated_content+= "//push LCL\n"
    translated_content+=push_reg_help("LCL")
    
    translated_content+= "//push ARG\n"
    translated_content+=push_reg_help("ARG")
    
    translated_content+= "//push THIS\n"
    translated_content+=push_reg_help("THIS")
    
    translated_content+= "//push THAT\n"
    translated_content+=push_reg_help("THAT")
    
    translated_content+= "//ARG = SP-(n+5) \n"
    translated_content+= "@SP"           + "    // A=SP=0" + "\n"
    translated_content+= "D=M"           + "    // D=RAM[SP]" + "\n"
    translated_content+= "@"+(int.parse(arr[2])+5).to_string()   + "    // A=new_variable=n+5" + "\n"
    translated_content+= "D=D-A"         + "    // D=RAM[SP]-new_variable" + "\n"
    translated_content+= "@ARG"         + "    // A=ARG=2" + "\n"
    translated_content+= "M=D"          + "    // M[ARG]=D" + "\n\n"
    
    translated_content+= "//LCL=SP \n"
    translated_content+= "@SP"           + "    // A=SP=0" + "\n"
    translated_content+= "D=M"           + "    // D=RAM[SP]" + "\n"
    translated_content+= "@LCL"          + "    // A=LCL=1" + "\n"
    translated_content+= "M=D"           + "    // M[LCL]=D" + "\n\n"
    
    translated_content+= "//goto "+arr[1]+" \n"
    translated_content+=func_goto({"_goto_",arr[1]})
    
    translated_content+= "//(label "+arr[1]+".ReturnAddress"+ReturnAddress_counter.to_string()+") \n"
    translated_content+=label({"_label_",arr[1]+".ReturnAddress"+ReturnAddress_counter.to_string()})
    ReturnAddress_counter++
    return translated_content
    
//------------------------------------------------------------------------------

def function(arr:array of string): string
    translated_content:string=""
    
    translated_content+= "//(label "+arr[1]+") \n"
    translated_content+=label({"_label_",arr[1]})
    
    translated_content += "//repeat " + arr[2] + " times:\n//\tpush 0\n"
    translated_content += "@" + arr[2]      +  "              // A=#local_variables" + "\n"
    translated_content += "D=A"             +  "              // D=A=#local_variables" + "\n"
    translated_content += label({"_label_",arr[1]+".Loop_start"})
    translated_content += "@"+arr[1]+".Loop_end" +       "    // A refers to the lable '" + arr[1]+".Loop_end + '\n"
    translated_content += "D;JEQ"          +             "    // Jumps if D=#local_variables is zero" + "\n"
    translated_content += "@SP"           +             "    // A=SP=0" + "\n"
    translated_content += "A=M"           +             "    // A=RAM[SP]" + "\n"
    translated_content += "M=0"           +             "    // RAM[RAM[SP]]=0" + "\n"
    translated_content += "@SP"           +             "    // A=SP=0" + "\n"
    translated_content += "M=M+1"         +             "    // RAM[SP]=RAM[SP]+1" + "\n"
    translated_content += "@"+arr[1]+".Loop_start" +    "    // A refers to the lable '" + arr[1]+".Loop_start + '\n"
    translated_content += "D=D-1;JNE"     +             "    // Jumps if D-1 is not zero" + "\n"
    translated_content += label({"label",arr[1]+".Loop_end"})
    return translated_content
    
//------------------------------------------------------------------------------

def ret(arr:array of string): string
    translated_content:string=""
    translated_content+="//FRAME = LCL\n"
    translated_content += "@LCL"           +  "    // A=LCL \n"
    translated_content += "D=M"            +  "    // D=RAM[LCL]" + "\n"
    translated_content += "@FRAME"         +  "    // A=FRAME; 'FRAME' refers to some mem. location" + "\n"
    translated_content += "M=D"            +  "    // RAM[FRAME]=D=RAM[LCL]" + "\n"
    
    translated_content+= store({"RET","FRAME","5"})
    
    translated_content+="//*ARG = pop()\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"           +  "    // RAM[SP]=RAM[SP]-1" + "\n"
    translated_content += "A=M"             +  "    // A=RAM[SP]" + "\n"
    translated_content += "D=M"             +  "    // D=RAM[RAM[SP]]=return_value" + "\n"
    translated_content += "@ARG"            +  "    // A=ARG" + "\n"
    translated_content += "A=M"             +  "    // A=RAM[ARG]" + "\n"
    translated_content += "M=D"             +  "    // RAM[RAM[ARG]]=D=return_value" + "\n\n"
    
    translated_content+="//SP = ARG+1\n" 
    translated_content += "@ARG"            +  "    // A=ARG" + "\n"
    translated_content += "D=M"             +  "    // D=RAM[ARG]" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=D+1"           +  "    // RAM[SP]=D+1" + "\n\n"
    
    translated_content+= store({"THAT","FRAME","1"})
    translated_content+= store({"THIS","FRAME","2"})
    translated_content+= store({"ARG","FRAME","3"})
    translated_content+= store({"LCL","FRAME","4"})
    
    translated_content+= "//goto RET \n"
    translated_content += "@RET"            +  "    // A=RET" + "\n"
    translated_content += "A=M"             +  "    // A=RAM[RET]=return_address" + "\n"
    translated_content += "0;JMP"           +  "    // Always Jumps" + "\n\n"
    
    return translated_content
    
    
//--------------------------------------------------------------------------

def store(arr:array of string): string
    translated_content:string=""
    translated_content+="//"+arr[0]+"=*("+arr[1]+"-"+arr[2]+")\n"
    translated_content += "@"+arr[2]           +  "    // A="+arr[2]+"\n"
    translated_content += "D=A"                +  "    // D=A="+arr[2]+"\n"
    translated_content += "@"+arr[1]           +  "    // A="+arr[1]+"\n"
    translated_content += "A=M-D"              +  "    // A=RAM["+arr[1]+"]-"+arr[2] + "\n"
    translated_content += "D=M"                +  "    // D=RAM[RAM["+arr[1]+"]-"+arr[2]+"]\n"
    translated_content += "@"+arr[0]           +  "    // A="+arr[0]+"\n"
    translated_content += "M=D"                +  "    // M["+arr[0]+"]=D==RAM["+arr[1]+"-"+arr[2]+"]\n\n"
    return translated_content
         
//-------------------------------------------------------------------------

def bootstrapping(): string
    translated_content:string=""
    translated_content += "//SP=256\n"    
    translated_content += "@256"              +  "    // A=256" + "\n"
    translated_content += "D=A"               +  "    // D=A=256" + "\n"
    translated_content += "@SP"               +  "    // A=SP=0" + "\n"
    translated_content += "M=D"               +  "    // M[SP]=D=256" + "\n\n"
    translated_content+= call({"_call_","Sys.init","0"})
    return translated_content       
    