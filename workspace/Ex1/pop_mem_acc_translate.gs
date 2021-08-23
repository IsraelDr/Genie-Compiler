[indent=4]

//------------------------------------------------------------------------------

def pop(arr:array of string, vmFileName:string): string
    case arr[1]
        when "static"
            return pop_static(arr,vmFileName)
        when "argument"
            return pop_argument(arr)
        when "local"
            return pop_local(arr)
        when "this"
            return pop_this(arr)
        when "that"
            return pop_that(arr)
        when "temp"
            return pop_temp(arr)
        when "pointer"
            return pop_pointer(arr)
        default 
            return "Error Line"

//------------------------------------------------------------------------------
            
def pop_static(arr:array of string, vmFileName:string): string
    translated_content:string=""
    translated_content += "@SP"                               +  "   // A=SP=0" + "\n"
    translated_content += "M=M-1"                             +  "   // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"                               +  "   // A=M[SP]" + "\n"
    translated_content += "D=M"                               +  "   // D=M[A]" + "\n"
    translated_content += "@" + vmFileName  + "." + arr[2]    +  "   // A = some_static_location" + "\n"
    translated_content += "M=D"                               +  "   // M[A]=D=some_static_variable" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def pop_argument(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"             +  "    // D=M[M[SP]]=var_to_be_popped" + "\n"
    translated_content += "@var_pop_loc"    +  "    // A=var_pop_loc; 'var_pop_loc' refers to some mem. location" + "\n"
    translated_content += "M=D"             +  "    // M[var_pop_loc]=D=var_to_be_popped" + "\n"
    translated_content += "@ARG"            +  "    // A=ARG=2" + "\n"
    translated_content += "D=M"             +  "    // D=M[ARG]=first_arg_location" + "\n"
    translated_content += "@" + arr[2]      +  "    // A=#arg" + "\n"
    translated_content += "D=D+A"           +  "    // D=first_arg_location+#arg=desirable_arg_location" + "\n"
    translated_content += "@des_arg_loc_loc"+  "    // A=des_arg_loc_loc; 'des_arg_loc_loc' refers to some mem. location" + "\n"
    translated_content += "M=D"             +  "    // M[des_arg_loc_loc]=D=desirable_arg_location" + "\n"
    translated_content += "@var_pop_loc"    +  "    // A=var_pop_loc" + "\n"
    translated_content += "D=M"             +  "    // D=M[var_pop_loc]=var_to_be_popped" + "\n"
    translated_content += "@des_arg_loc_loc"+  "    // A=des_arg_loc_loc" + "\n"
    translated_content += "A=M"             +  "    // A=M[des_arg_loc_loc]=desirable_arg_location" + "\n"
    translated_content += "M=D"             +  "    // M[desirable_arg_location]=D=var_to_be_popped" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def pop_local(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"             +  "    // D=M[M[SP]]=var_to_be_popped" + "\n"
    translated_content += "@var_pop_loc"    +  "    // A=var_pop_loc; 'var_pop_loc' refers to some mem. location" + "\n"
    translated_content += "M=D"             +  "    // M[var_pop_loc]=D=var_to_be_popped" + "\n"
    translated_content += "@LCL"            +  "    // A=LCL=1" + "\n"
    translated_content += "D=M"             +  "    // D=M[ARG]=first_arg_location" + "\n"
    translated_content += "@" + arr[2]      +  "    // A=#arg" + "\n"
    translated_content += "D=D+A"           +  "    // D=first_arg_location+#arg=desirable_arg_location" + "\n"
    translated_content += "@des_arg_loc_loc"+  "    // A=des_arg_loc_loc; 'des_arg_loc_loc' refers to some mem. location" + "\n"
    translated_content += "M=D"             +  "    // M[des_arg_loc_loc]=D=desirable_arg_location" + "\n"
    translated_content += "@var_pop_loc"    +  "    // A=var_pop_loc" + "\n"
    translated_content += "D=M"             +  "    // D=M[var_pop_loc]=var_to_be_popped" + "\n"
    translated_content += "@des_arg_loc_loc"+  "    // A=des_arg_loc_loc" + "\n"
    translated_content += "A=M"             +  "    // A=M[des_arg_loc_loc]=desirable_arg_location" + "\n"
    translated_content += "M=D"             +  "    // M[desirable_arg_location]=D=var_to_be_popped" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def pop_this(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"             +  "    // D=M[M[SP]]=var_to_be_popped" + "\n"
    translated_content += "@var_pop_loc"    +  "    // A=var_pop_loc; 'var_pop_loc' refers to some mem. location" + "\n"
    translated_content += "M=D"             +  "    // M[var_pop_loc]=D=var_to_be_popped" + "\n"
    translated_content += "@THIS"            +  "    // A=THIS=3" + "\n"
    translated_content += "D=M"             +  "    // D=M[ARG]=first_arg_location" + "\n"
    translated_content += "@" + arr[2]      +  "    // A=#arg" + "\n"
    translated_content += "D=D+A"           +  "    // D=first_arg_location+#arg=desirable_arg_location" + "\n"
    translated_content += "@des_arg_loc_loc"+  "    // A=des_arg_loc_loc; 'des_arg_loc_loc' refers to some mem. location" + "\n"
    translated_content += "M=D"             +  "    // M[des_arg_loc_loc]=D=desirable_arg_location" + "\n"
    translated_content += "@var_pop_loc"    +  "    // A=var_pop_loc" + "\n"
    translated_content += "D=M"             +  "    // D=M[var_pop_loc]=var_to_be_popped" + "\n"
    translated_content += "@des_arg_loc_loc"+  "    // A=des_arg_loc_loc" + "\n"
    translated_content += "A=M"             +  "    // A=M[des_arg_loc_loc]=desirable_arg_location" + "\n"
    translated_content += "M=D"             +  "    // M[desirable_arg_location]=D=var_to_be_popped" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def pop_that(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"             +  "    // D=M[M[SP]]=var_to_be_popped" + "\n"
    translated_content += "@var_pop_loc"    +  "    // A=var_pop_loc; 'var_pop_loc' refers to some mem. location" + "\n"
    translated_content += "M=D"             +  "    // M[var_pop_loc]=D=var_to_be_popped" + "\n"
    translated_content += "@THAT"            +  "    // A=THAT=4" + "\n"
    translated_content += "D=M"             +  "    // D=M[ARG]=first_arg_location" + "\n"
    translated_content += "@" + arr[2]      +  "    // A=#arg" + "\n"
    translated_content += "D=D+A"           +  "    // D=first_arg_location+#arg=desirable_arg_location" + "\n"
    translated_content += "@des_arg_loc_loc"+  "    // A=des_arg_loc_loc; 'des_arg_loc_loc' refers to some mem. location" + "\n"
    translated_content += "M=D"             +  "    // M[des_arg_loc_loc]=D=desirable_arg_location" + "\n"
    translated_content += "@var_pop_loc"    +  "    // A=var_pop_loc" + "\n"
    translated_content += "D=M"             +  "    // D=M[var_pop_loc]=var_to_be_popped" + "\n"
    translated_content += "@des_arg_loc_loc"+  "    // A=des_arg_loc_loc" + "\n"
    translated_content += "A=M"             +  "    // A=M[des_arg_loc_loc]=desirable_arg_location" + "\n"
    translated_content += "M=D"             +  "    // M[desirable_arg_location]=D=var_to_be_popped" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def pop_temp(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"             +  "    // D=M[M[SP]]=var_to_be_popped" + "\n"
    translated_content += "@var_pop_loc"    +  "    // A=var_pop_loc; 'var_pop_loc' refers to some mem. location" + "\n"
    translated_content += "M=D"             +  "    // M[var_pop_loc]=D=var_to_be_popped" + "\n"
    translated_content += "@5"              +  "    // A=5t" + "\n"
    translated_content += "D=A"             +  "    // D=A=5" + "\n"
    translated_content += "@" + arr[2]      +  "    // A=#arg" + "\n"
    translated_content += "D=D+A"           +  "    // D=first_arg_location+#arg=desirable_arg_location" + "\n"
    translated_content += "@des_arg_loc_loc"+  "    // A=des_arg_loc_loc; 'des_arg_loc_loc' refers to some mem. location" + "\n"
    translated_content += "M=D"             +  "    // M[des_arg_loc_loc]=D=desirable_arg_location" + "\n"
    translated_content += "@var_pop_loc"    +  "    // A=var_pop_loc" + "\n"
    translated_content += "D=M"             +  "    // D=M[var_pop_loc]=var_to_be_popped" + "\n"
    translated_content += "@des_arg_loc_loc"+  "    // A=des_arg_loc_loc" + "\n"
    translated_content += "A=M"             +  "    // A=M[des_arg_loc_loc]=desirable_arg_location" + "\n"
    translated_content += "M=D"             +  "    // M[desirable_arg_location]=D=var_to_be_popped" + "\n\n"
    return translated_content
    
//------------------------------------------------------------------------------
    
def pop_pointer(arr:array of string): string
    translated_content:string=""
    translated_content += "@SP"             +  "    // A=SP=0" + "\n"
    translated_content += "M=M-1"           +  "    // M[SP]=M[SP]-1" + "\n"
    translated_content += "A=M"             +  "    // A=M[SP]" + "\n"
    translated_content += "D=M"             +  "    // D=M[M[SP]]=var_to_be_popped" + "\n"
    if (int.parse(arr[2])==0)
        translated_content += "@THIS"            +  "    // A=THIS=3" + "\n"
    else
        translated_content += "@THAT"            +  "    // A=THAT=4" + "\n"
    translated_content += "M=D"             +  "    // M[THIS or THAT]=D=var_to_be_popped" + "\n\n"
    return translated_content
    