[indent=4]

//------------------------------------------------------------------------------

class VMWriter

    node: NonTerminal
    symbolTable: SymbolTable
    lableCounter: int
    
    //------------------------------
    
    construct(_node: Node)
        //print("construct")
        node = (NonTerminal)_node
        symbolTable = new SymbolTable(((Terminal)(node.childs.nth_data(1))).tok.lexeme)
        lableCounter = 0
    
    //------------------------------
    
    def get_segment_according_to_kind(kind: Kind): string
        //print("get_segment_according_to_kind")
        case kind
            when Kind.STATIC
                return "static"
            when Kind.FIELD
                return "this"
            when Kind.ARG
                return "argument"
            default
                return "local"
    
    //------------------------------
        
    def write(vmFilePath: string)
        //print("write")
        vmFile: FileStream = FileStream.open(vmFilePath,"w")
        vmFile.puts(writeClass(node))
        
    //------------------------------
        
    def writeClass(_node: NonTerminal): string
        //print("writeClass")
        vm_code: string = ""
        current: int = 3
        while (_node.childs.nth_data(current).get_type_name() != "Terminal")
            inner_node: NonTerminal = (NonTerminal)(_node.childs.nth_data(current))
            
            if (inner_node.name == "classVarDec")
                treatClassVarDec(inner_node)
            else
                vm_code += writeSubroutineDec(inner_node)
            
            current += 1
        
        return vm_code
         
    //------------------------------     
        
    def treatClassVarDec(_node: NonTerminal)
        //print("treatClassVarDec")
        // defining the kind of the var
        kind: Kind = Kind.FIELD
        if (((Terminal)(_node.childs.nth_data(0))).tok.lexeme == "static")
            kind = Kind.STATIC
        
        // defining the type of the var
        type: string = ((Terminal)(_node.childs.nth_data(1))).tok.lexeme
        
        // defining the name of the var
        name: string = ((Terminal)(_node.childs.nth_data(2))).tok.lexeme
        
        symbolTable.add(name, type, kind)
            
        current: int = 3
        
        while (((Terminal)(_node.childs.nth_data(current))).tok.lexeme == ",")
            current += 1
            name = ((Terminal)(_node.childs.nth_data(current))).tok.lexeme
            symbolTable.add(name, type, kind)
            current += 1
        
    //------------------------------
    
    def writeSubroutineDec(_node: NonTerminal): string
        //print("writeSubroutineDec")
        vm_code: string = ""
        
        //adding function to the symbolTable
        symbolTable.startSubroutine(((Terminal)(_node.childs.nth_data(2))).tok.lexeme)
        
        if(((Terminal)(_node.childs.nth_data(0))).tok.lexeme == "method")
            symbolTable.add("this",symbolTable.className,Kind.ARG)
        treatParameterList((NonTerminal)(_node.childs.nth_data(4)))
        
        //create function body to get number of local variables
        temp: string = writeSubroutineBody((NonTerminal)(_node.childs.nth_data(6))) 
        // function signature
        vm_code += "function " + symbolTable.className + "." + symbolTable.subroutineName + " " + symbolTable.varCount.to_string() + "\n"
        
        // add THIS to the function 
        if(((Terminal)(_node.childs.nth_data(0))).tok.lexeme == "method")
            vm_code += "push argument 0\n"
            vm_code += "pop pointer 0\n"
            
        if(((Terminal)(_node.childs.nth_data(0))).tok.lexeme == "constructor")
            vm_code += "push constant " + (symbolTable.fieldCount + symbolTable.staticCount).to_string() + "\n"
            vm_code += "call Memory.alloc 1\n"
            vm_code += "pop pointer 0\n"
            
        // add function body    
        vm_code += temp
        
        return vm_code
        
        
    //------------------------------     
    
    def treatParameterList(_node: NonTerminal)
        //print("treatParameterList")
        if(_node.childs.length()==0)
            return
        
        // defining the kind of the var
        kind: Kind = Kind.ARG
        
        // defining the type of the var
        type: string = ((Terminal)(_node.childs.nth_data(0))).tok.lexeme
        
        // defining the name of the var
        name: string = ((Terminal)(_node.childs.nth_data(1))).tok.lexeme
        
        symbolTable.add(name, type, kind)
        
        current: int = 2
            
        while (_node.childs.length() > current)
            current += 1
            type = ((Terminal)(_node.childs.nth_data(current))).tok.lexeme
            
            current += 1
            name = ((Terminal)(_node.childs.nth_data(current))).tok.lexeme
            
            symbolTable.add(name, type, kind)
            current += 1
        
    //------------------------------
    
    def writeSubroutineBody(_node: NonTerminal): string
        //print("writeSubroutineBody")
        current: int = 1
        // treating var declirations
        while (((NonTerminal)(_node.childs.nth_data(current))).name == "varDec")
            treatVarDec((NonTerminal)(_node.childs.nth_data(current)))
            current += 1
        return writeStatements((NonTerminal)(_node.childs.nth_data(current)))
            
    //------------------------------  
        
    def treatVarDec(_node: NonTerminal)
        //print("treatVarDec")
        // defining the kind of the var
        kind: Kind = Kind.VAR
        
        // defining the type of the var
        type: string = ((Terminal)(_node.childs.nth_data(1))).tok.lexeme
        
        // defining the name of the var
        name: string = ((Terminal)(_node.childs.nth_data(2))).tok.lexeme
        
        symbolTable.add(name, type, kind)
            
        current: int = 3
        
        while (((Terminal)(_node.childs.nth_data(current))).tok.lexeme == ",")
            current += 1
            name = ((Terminal)(_node.childs.nth_data(current))).tok.lexeme
            symbolTable.add(name, type, kind)
            current += 1
    
    //------------------------------
    
    def writeStatements(_node: NonTerminal): string
        //print "writeStatements"    
        vm_code: string = ""
        
        current: int = 0
        while (_node.childs.length() != current)
            vm_code += writeStatement((NonTerminal)(_node.childs.nth_data(current)))
            current += 1
        
        return vm_code
    
    //------------------------------
    
    def writeStatement(_node: NonTerminal): string
        
        case _node.name
        
            when "letStatement"
                return writeLetStatement(_node)
            
            when "ifStatement"
                return writeIfStatement(_node)
                
            when "whileStatement"
                return writeWhileStatement(_node)
                
            when "doStatement"
                return writeDoStatement(_node)
                
            default
                return writeReturnStatement(_node)
                
    //------------------------------
    
    def writeLetStatement(_node: NonTerminal): string
        //print "writeLetStatement"
        vm_code: string = ""
        
        expression_index : int = 3
        
        // if the variable that is about to be changed is an array value
        if (((Terminal)(_node.childs.nth_data(2))).tok.lexeme == "[")
            
            vm_code += "// \"let\" expression of setting a value into a certain offset in an array \n"
            
            vm_code += "// inserting the array offset to the stack \n"
            vm_code += writeExpression((NonTerminal)(_node.childs.nth_data(3)))
            
            vm_code += "// inserting the array base pointer to the stack \n"
            araySymbol: Symbol = symbolTable.find(((Terminal)(_node.childs.nth_data(1))).tok.lexeme)
            vm_code += "push " + get_segment_according_to_kind(araySymbol.kind) + " " + araySymbol.index.to_string() + "\n"
            
            vm_code += "// getting the pointer to the desired index in the array on the top of the stack\n"
            vm_code += "add\n"
            
            expression_index = 6
            
            vm_code += "// inserting the expression that is about to be insert to the desired index in the array, into the stack\n"
            vm_code += writeExpression((NonTerminal)(_node.childs.nth_data(expression_index)))
            
            vm_code += "pop temp 0\n"
            
            vm_code += "// using the \"THAT\" pointer to access the desired index in the array\n"
            vm_code += "pop pointer 1\n"
            
            vm_code += "push temp 0\n"
            
            vm_code += "pop that 0\n"
        
        else
        
            vm_code += "// inserting the expression that is about to be insert to the desired index in the array, into the stack\n"
            vm_code += writeExpression((NonTerminal)(_node.childs.nth_data(expression_index)))
        
            varSymbol: Symbol = symbolTable.find(((Terminal)(_node.childs.nth_data(1))).tok.lexeme)
            vm_code += "pop " + get_segment_according_to_kind(varSymbol.kind) + " " + varSymbol.index.to_string() + "\n"
            
        return vm_code
        
    //------------------------------
    
    def writeIfStatement(_node: NonTerminal): string
        //print "writeIfStatement"
        vm_code: string = "//condition\n"
        vm_code += writeExpression((NonTerminal)(_node.childs.nth_data(2)))
        
        true_label: string = symbolTable.className + "_true_label" + lableCounter.to_string()
        false_label: string = symbolTable.className + "_false_label" + lableCounter.to_string()
        continue_label: string = symbolTable.className + "_continue_label" + lableCounter.to_string()
        lableCounter += 1
        
        vm_code += "if-goto " + true_label + "\n"
        vm_code += "goto " + false_label + "\n"
        
        vm_code += "label " + true_label + "\n"
        vm_code += "// true statments\n"
        vm_code += writeStatements((NonTerminal)(_node.childs.nth_data(5)))
        
        // if it's an if-else statement
        if (_node.childs.length() > 7)
            vm_code += "goto " + continue_label + "\n"
            
        vm_code += "label " + false_label + "\n"
        
        // if it's an if-else statement
        if (_node.childs.length() > 7)
            vm_code += "// false statments\n"
            vm_code += writeStatements((NonTerminal)(_node.childs.nth_data(9)))
            vm_code += "label " + continue_label + "\n"
            
        return vm_code
        
    //------------------------------
    
    def writeWhileStatement(_node: NonTerminal): string
        //print "writeWhileStatement"
        true_label: string = symbolTable.className + "_true_label" + lableCounter.to_string()
        false_label: string = symbolTable.className + "_false_label" + lableCounter.to_string()
        check_label: string = symbolTable.className + "_check_label" + lableCounter.to_string()
        lableCounter += 1
        vm_code: string = "//condition\n"
        vm_code += "label " + check_label + "\n"
        vm_code += writeExpression((NonTerminal)(_node.childs.nth_data(2)))
        
        vm_code += "if-goto " + true_label + "\n"
        vm_code += "goto " + false_label + "\n"
        
        vm_code += "label " + true_label + "\n"
        vm_code += "// while statments\n"
        vm_code += writeStatements((NonTerminal)(_node.childs.nth_data(5)))
        
        vm_code += "goto " + check_label + "\n"
        
        vm_code += "label " + false_label + "\n"
        
        return vm_code

    //------------------------------
    
    def writeDoStatement(_node: NonTerminal): string
        //print "writeDoStatement"
        vm_code: string = "// do statement\n"
        vm_code += writeSubroutineCall((NonTerminal)(_node.childs.nth_data(1)))
        vm_code += "// ignoring the output of the function\n"
        vm_code += "pop temp 0\n"
        return vm_code
        
    //------------------------------
    
    def writeReturnStatement(_node: NonTerminal): string
        //print "writeReturnStatement"
        vm_code: string = "// inserting the return value to the stack\n"
        
        if (_node.childs.length() == 3)
            vm_code += writeExpression((NonTerminal)(_node.childs.nth_data(1)))
        else
            vm_code += "push constant 0\n"
        vm_code += "return\n"
        
        return vm_code
        
    //------------------------------
    
    def writeExpression(_node: NonTerminal): string
        //print "writeExpression"
        current: int = 0
        vm_code: string = writeTerm((NonTerminal)(_node.childs.nth_data(current)))
        
        while (_node.childs.length() > current + 1)
            current += 1
            vm_code += writeTerm((NonTerminal)(_node.childs.nth_data(current + 1)))
            case ((Terminal)(_node.childs.nth_data(current))).tok.lexeme
                
                when "+"
                    vm_code += "add\n"
                when "-"
                    vm_code += "sub\n"
                when "*"
                    vm_code += "call Math.multiply 2\n"
                when "/"
                    vm_code += "call Math.divide 2\n"
                when "&amp;"
                    vm_code += "and\n"
                when "|"
                    vm_code += "or\n"
                when "&lt;"
                    vm_code += "lt\n"
                when "&gt;"
                    vm_code += "gt\n"
                default
                    vm_code += "eq\n"
            
            current += 1
        //print vm_code  
        return vm_code
        
    //------------------------------
    
    def writeTerm(_node: NonTerminal): string
        //print "writeTerm"
        vm_code: string = ""
        
        if (_node.childs.length() == 1)
        
            if (_node.childs.nth_data(0).get_type_name() == "NonTerminal")
                return writeSubroutineCall((NonTerminal)(_node.childs.nth_data(0)))
                
            inner_node: Terminal = (Terminal)(_node.childs.nth_data(0))
            
            case inner_node.tok.pattern
            
                when "integerConstant"
                    return "push constant " + inner_node.tok.lexeme + "\n"
                    
                when "stringConstant"
                
                    vm_code += "push constant " + (inner_node.tok.lexeme.length).to_string() + "\n"
                    vm_code += "call String.new 1\n"
                    current: int = 0
                    while (current != inner_node.tok.lexeme.length)
                        ascii: int = (int)inner_node.tok.lexeme[current]
                        vm_code += "push constant " + ascii.to_string() + "\n"
                        vm_code += "call String.appendChar 2\n"
                        current += 1
                    return vm_code
                    
                when "keyword"
                
                    case inner_node.tok.lexeme
                        
                        when "true"
                            vm_code += "push constant 1\n"
                            vm_code += "neg\n"
                            return vm_code
                            
                        when "false", "null"
                            return "push constant 0\n"
                            
                        default
                            return "push pointer 0\n"
                
                default
                    identifierSymbol: Symbol = symbolTable.find(inner_node.tok.lexeme)
                    return "push " + get_segment_according_to_kind(identifierSymbol.kind) + " " + identifierSymbol.index.to_string() + "\n"
        
        if (_node.childs.length() == 2)
            if(((Terminal)(_node.childs.nth_data(0))).tok.lexeme=="-")
                vm_code += "neg\n"
            else
                vm_code += "not\n"
            //print vm_code
            return  writeTerm((NonTerminal)(_node.childs.nth_data(1)))+vm_code
        
        
        if (((Terminal)(_node.childs.nth_data(0))).tok.lexeme == "(" )
            return writeExpression((NonTerminal)(_node.childs.nth_data(1)))
        
        vm_code += "// inserting the array offset to the stack \n"
        vm_code += writeExpression((NonTerminal)(_node.childs.nth_data(2)))
        
        vm_code += "// inserting the array base pointer to the stack \n"
        araySymbol: Symbol = symbolTable.find(((Terminal)(_node.childs.nth_data(0))).tok.lexeme)
        vm_code += "push " + get_segment_according_to_kind(araySymbol.kind) + " " + araySymbol.index.to_string() + "\n"
            
        vm_code += "// getting the pointer to the desired index in the array on the top of the stack\n"
        vm_code += "add\n"
            
        vm_code += "// using the \"THAT\" pointer to access the desired index in the array\n"
        vm_code += "pop pointer 1\n"
        
        vm_code += "push that 0\n"
        
        return vm_code
                    
     //------------------------------           
      
    def writeSubroutineCall(_node: NonTerminal): string
        //print "writeSubroutineCall"
        vm_code :string = ""
        
        argumentNumber:int = 0
        //print "aaaaa"
        if (((Terminal)(_node.childs.nth_data(1))).tok.lexeme == ".")
            
            //function call with class name or object name
            inner_node : NonTerminal = (NonTerminal)(_node.childs.nth_data(4))
            temp:string = writeExpressionlist(inner_node)
            //vm_code += writeExpressionlist(inner_node)
            //print "kkkkk"
            classOrObjectName: string = ((Terminal)(_node.childs.nth_data(0))).tok.lexeme
            //print classOrObjectName
            symbol : Symbol = symbolTable.find(classOrObjectName)
            //print "llll"
            if(symbol==null)
                argumentNumber = (int)((inner_node.childs.length()+1)/2)
                //print "mmmm"
                if(inner_node.childs.length()==0)
                    argumentNumber=0
            else
                vm_code += "push " + get_segment_according_to_kind(symbol.kind) + " " + symbol.index.to_string() + "\n"
                classOrObjectName = symbol.type
                argumentNumber = (int)((inner_node.childs.length()+1)/2+1)
                if(inner_node.childs.length()==0)
                    argumentNumber=1
            //print "nnnn"
            vm_code += temp
            vm_code+="call "+classOrObjectName+"."+((Terminal)(_node.childs.nth_data(2))).tok.lexeme + " " + argumentNumber.to_string() + "\n"
        
        else
            
            //function call without class name or object name
            vm_code += "push pointer 0\n"
            inner_node : NonTerminal = (NonTerminal)(_node.childs.nth_data(2))
            vm_code+=writeExpressionlist(inner_node)
            
            argumentNumber = (int)((inner_node.childs.length()+1)/2+1)
            if(inner_node.childs.length()==0)
                argumentNumber=1
            
            
            vm_code += "call "+symbolTable.className+"."+((Terminal)(_node.childs.nth_data(0))).tok.lexeme+" "+(argumentNumber).to_string() + "\n"
        //print "bbbbbb"
        //print vm_code
        //print "ccccc"
        return vm_code
            
        
    //------------------------------  
    
    def writeExpressionlist(_node: NonTerminal): string
        //print "writeExpressionlist"
        vm_code : string = ""
        if(_node.childs.length()>0)
            current : int = 0
            
            vm_code+=writeExpression((NonTerminal)(_node.childs.nth_data(current)))
            current += 1
            while (_node.childs.length() > current)
                current += 1
                vm_code+=writeExpression((NonTerminal)(_node.childs.nth_data(current)))
                current += 1
                
        return vm_code       
        







    
            