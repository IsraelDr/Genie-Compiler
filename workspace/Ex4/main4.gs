// valac Ex4/main4.gs Ex4/JackTokenizer.gs Ex4/tokens.gs Ex4/CompilationEngine.gs Ex4/nodes.gs Ex4/VMWriter.gs Ex4/symbols.gs

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
           
    fileName : string
    while ((fileName = directory.read_name()) != null)
        if fileName.has_suffix(".jack") // checking if the file is a "jack" file
            jackfilename:string = Path.build_filename(path,fileName)
            input:string=read(jackfilename)
            var tokenizer=new JackTokenizer(input)
            result:List of Token=tokenizer.tokenize()
            //write_tokens_to_xml(Path.build_filename(path,fileName.slice(0,fileName.length-5)+"T.xml"),result)
            var compiler = new CompilationEngine(result)
            node:Node = compiler.compile()
            var vmwriter = new VMWriter(node)
            vmwriter.write(Path.build_filename(path,fileName.slice(0,fileName.length-5)+".vm"))
            //xmlFile = FileStream.open(Path.build_filename(path,fileName.slice(0,fileName.length-5)+".xml"),"w")
            //write_tree_to_xml(node, xmlFile)
    
    
def write_tokens_to_xml(xmlFilename:string, result:List of Token) 
    xmlFile:FileStream = FileStream.open(xmlFilename , "w")
    xmlFile.puts("<tokens>\n")
    for tok in result do xmlFile.puts("<" + tok.pattern + "> " + tok.lexeme + " </" + tok.pattern + ">\n")
    xmlFile.puts("</tokens>\n")
    
def read(filename:string):string
    result:string=""
    line:string
    file:FileStream = FileStream.open(filename, "r")
    while((line = file.read_line()) != null)
        result+=line
    return result
    
def write_tree_to_xml(node:Node,xmlFile:FileStream)
    if(node.get_type_name() == "Terminal")
        term_node : Terminal = (Terminal)node
        xmlFile.puts("<" + term_node.tok.pattern + "> " + term_node.tok.lexeme + " </" + term_node.tok.pattern + ">\n")
    else
        non_term_node : NonTerminal = (NonTerminal)node
        
        if ( non_term_node.name != "subroutineCall" )
            xmlFile.puts("<" + non_term_node.name + "> \n")
        for child in non_term_node.childs do (write_tree_to_xml(child,xmlFile))
        if ( non_term_node.name != "subroutineCall" )
            xmlFile.puts(" </" + non_term_node.name + ">\n")
    
        
        


    
    