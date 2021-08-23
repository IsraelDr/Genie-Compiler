// valac Ex1/main1.gs Ex1/translating.gs Ex1/push_mem_acc_translate.gs Ex1/pop_mem_acc_translate.gs Ex1/aritmetic_translate.gs Ex1/logical_translate.gs Ex1/tools.gs Ex1/program_flow_translate.gs Ex1/function_call_translate.gs

[indent=4]

//------------------------------------------------------------------------------

init
    flag : bool = true
    directory : Dir = null
    path : string = ""
    while flag
        print "Please enter the path of the directory"
        path = stdin.read_line()
        try
            directory = Dir.open(path,0)
            flag = false
        except ex : FileError
            print ex.message
    
    // creating the "asm" file
    var asmFile = FileStream.open(Path.build_filename(path,"output.asm") , "w")
           
    fileName : string
    asmFile.puts(bootstrapping())
    while ((fileName = directory.read_name()) != null)
        if fileName.has_suffix(".vm") // checking if the file is a "vm" file
            file_path:string = Path.build_filename(path,fileName)
            var vmfile = FileStream.open(file_path , "r")
            line:string
            
            while ((line = vmfile.read_line()) != null)
                line = remove_leading_whitespace(line) // cleaning whitespace from the prefix of the line
                if (line.has_prefix("//") || line[0].isspace())
                    continue
                translate_to_asm_file(line,asmFile,fileName.slice(0,fileName.length-3))
                
    
    
    