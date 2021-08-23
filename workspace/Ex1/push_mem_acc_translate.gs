[indent=4]

//------------------------------------------------------------------------------    
def push(arr:array of string, vmFileName:string): string
    case arr[1]
        when "constant"
            return push_constant(arr)
        when "static"
            return push_static(arr,vmFileName)
        when "argument"
            return push_argument(arr)
        when "local"
            return push_local(arr)
        when "this"
            return push_this(arr)
        when "that"
            return push_that(arr)
        when "temp"
            return push_temp(arr)
        when "pointer"
            return push_pointer(arr)
        default 
            return "Error Line"
            
//------------------------------------------------------------------------------
    
def push_constant(arr:array of string): string
    translated_content:string=""
    translated_content += "@" + arr[2]      +  "    // A=some_constant" + "\n"
    translated_content += "D=A"             +  "    // D=A=some_constant" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "M=D"             +  "    // M[M[SP]]=D=some_constant" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M+1"           +  "    // M[SP]=M[SP]+1" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def push_static(arr:array of string, vmFileName:string): string
    translated_content:string=""
    translated_content += "@" + vmFileName + "." + arr[2]      +  "    // A=some_static_location" + "\n"
    translated_content += "D=M"                                +  "    // D=M[A]=some_static_variable" + "\n"
    translated_content += "@SP"                                +  "    // A=SP=0" + "\n"
    translated_content += "A=M"                                +  "    // A=M[SP]" + "\n"
    translated_content += "M=D"                                +  "    // M[M[SP]]=D=some_static_variable" + "\n"
    translated_content += "@SP"                                +  "    // A=SP=0" + "\n"
    translated_content += "M=M+1"                              +  "    // M[SP]=M[SP]+1" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def push_argument(arr:array of string): string
    translated_content:string=""
    translated_content += "@ARG"            +  "    // A=ARG=2" + "\n"
    translated_content += "D=M"             +  "    // D=M[ARG]=first_arg_location" + "\n"
    translated_content += "@" + arr[2]      +  "    // A=#arg" + "\n"
    translated_content += "A=D+A"           +  "    // A=first_arg_location+#arg=desirable_arg_location" + "\n"
    translated_content += "D=M"             +  "    // D=M[desirable_arg_location]=desirable_arg" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "M=D"             +  "    // M[M[SP]]=D=desirable_arg" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M+1"           +  "    // M[SP]=M[SP]+1" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def push_local(arr:array of string): string
    translated_content:string=""
    translated_content += "@LCL"            +  "    // A=LCL=1" + "\n"
    translated_content += "D=M"             +  "    // D=M[LCL]=first_arg_location" + "\n"
    translated_content += "@" + arr[2]      +  "    // A=#arg" + "\n"
    translated_content += "A=D+A"           +  "    // A=first_arg_location+#arg=desirable_arg_location" + "\n"
    translated_content += "D=M"             +  "    // D=M[desirable_arg_location]=desirable_arg" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "M=D"             +  "    // M[M[SP]]=D=desirable_arg" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M+1"           +  "    // M[SP]=M[SP]+1" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def push_this(arr:array of string): string
    translated_content:string=""
    translated_content += "@THIS"            +  "    // A=THIS=3" + "\n"
    translated_content += "D=M"             +  "    // D=M[LCL]=first_arg_location" + "\n"
    translated_content += "@" + arr[2]      +  "    // A=#arg" + "\n"
    translated_content += "A=D+A"           +  "    // A=first_arg_location+#arg=desirable_arg_location" + "\n"
    translated_content += "D=M"             +  "    // D=M[desirable_arg_location]=desirable_arg" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "M=D"             +  "    // M[M[SP]]=D=desirable_arg" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M+1"           +  "    // M[SP]=M[SP]+1" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def push_that(arr:array of string): string
    translated_content:string=""
    translated_content += "@THAT"            +  "    // A=THAT=4" + "\n"
    translated_content += "D=M"             +  "    // D=M[LCL]=first_arg_location" + "\n"
    translated_content += "@" + arr[2]      +  "    // A=#arg" + "\n"
    translated_content += "A=D+A"           +  "    // A=first_arg_location+#arg=desirable_arg_location" + "\n"
    translated_content += "D=M"             +  "    // D=M[desirable_arg_location]=desirable_arg" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "M=D"             +  "    // M[M[SP]]=D=desirable_arg" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M+1"           +  "    // M[SP]=M[SP]+1" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def push_temp(arr:array of string): string
    translated_content:string=""
    translated_content += "@5"              +  "    // A=5t" + "\n"
    translated_content += "D=A"             +  "    // D=A=5" + "\n"
    translated_content += "@" + arr[2]      +  "    // A=#arg" + "\n"
    translated_content += "A=D+A"           +  "    // A=first_arg_location+#arg=desirable_arg_location" + "\n"
    translated_content += "D=M"             +  "    // D=M[desirable_arg_location]=desirable_arg" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "M=D"             +  "    // M[M[SP]]=D=desirable_arg" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M+1"           +  "    // M[SP]=M[SP]+1" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def push_pointer(arr:array of string): string
    translated_content:string=""
    if (int.parse(arr[2])==0)
        translated_content = push_reg_help("THIS")
    else
        translated_content = push_reg_help("THAT")
    return translated_content
    
//----------------------------------------------------------------------------------------

def push_reg_help(str:string): string
    translated_content:string=""
    translated_content += "@"+str           +  "    // A="+str + "\n"
    translated_content += "D=M"             +  "    // D=M["+str+"]=first_arg_location" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "M=D"             +  "    // M[M[SP]]=D=desirable_arg" + "\n"
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M+1"           +  "    // M[SP]=M[SP]+1" + "\n\n"
    return translated_content       
    