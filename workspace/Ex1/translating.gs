[indent=4]

//------------------------------------------------------------------------------

def translate_to_asm_file(line:string, asmFile:FileStream, vmFileName:string)
    var arr=line.split_set(" \n\t\r")
    case arr[0]
        when "push"
            asmFile.puts("// "+arr[0]+" "+arr[1]+" "+arr[2]+"\n")
            asmFile.puts(push(arr,vmFileName))
        when "pop"
            asmFile.puts("// "+arr[0]+" "+arr[1]+" "+arr[2]+"\n")
            asmFile.puts(pop(arr,vmFileName))
        when "add"
            asmFile.puts("// "+arr[0]+"\n")
            asmFile.puts(add(arr))
        when "sub"
            asmFile.puts("// "+arr[0]+"\n")
            asmFile.puts(sub(arr))
        when "or"
            asmFile.puts("// "+arr[0]+"\n")
            asmFile.puts(Or(arr))
        when "and"
            asmFile.puts("// "+arr[0]+"\n")
            asmFile.puts(And(arr))
        when "neg"
            asmFile.puts("// "+arr[0]+"\n")
            asmFile.puts(neg(arr))
        when "not"
            asmFile.puts("// "+arr[0]+"\n")
            asmFile.puts(Not(arr))
        when "eq"
            asmFile.puts("// "+arr[0]+"\n")
            asmFile.puts(eq(arr))
        when "gt"
            asmFile.puts("// "+arr[0]+"\n")
            asmFile.puts(gt(arr))
        when "lt"
            asmFile.puts("// "+arr[0]+"\n")
            asmFile.puts(lt(arr))
        when "label"
            asmFile.puts("// "+arr[0]+" "+arr[1]+"\n")
            asmFile.puts(label(arr))
        when "goto"
            asmFile.puts("// "+arr[0]+" "+arr[1]+"\n")
            asmFile.puts(func_goto(arr))
        when "if-goto"
            asmFile.puts("// "+arr[0]+" "+arr[1]+"\n")
            asmFile.puts(func_if(arr))
        when "function"
            asmFile.puts("// "+arr[0]+" "+arr[1]+"\n")
            asmFile.puts(function(arr))
        when "call"
            asmFile.puts("// "+arr[0]+" "+arr[1]+"\n")
            asmFile.puts(call(arr))
        when "return"
            asmFile.puts("// "+arr[0]+" "+arr[1]+"\n")
            asmFile.puts(ret(arr))
        default
            asmFile.puts("// Error Line/n")

