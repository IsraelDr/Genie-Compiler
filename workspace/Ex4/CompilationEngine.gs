[indent=4]

//------------------------------------------------------------------------------

class CompilationEngine
    
    tokens : List of Token
    current : int
    
    construct(_tokens:List of Token)
        tokens=_tokens.copy()
        current = 0
        
    //------------------------------
    
    def get_to_the_end() : bool
        return current >= tokens.length()
    
    //------------------------------
    
    def next_token()
        current += 1
    
    //------------------------------
    
    def compile():Node
        return compileClass()
    
    //------------------------------
    
    def compileClass():Node
        
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "class"
        
        term_class : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_class)
        
        non_term_className : Node = compileClassName()
        sub_tree_root.childs.append(non_term_className)
        
        term_left_curly_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_left_curly_brace)
        
        while (tokens.nth_data(current).lexeme == "static" || tokens.nth_data(current).lexeme == "field")
            non_term_classVarDec : Node = compileClassVarDec()
            sub_tree_root.childs.append(non_term_classVarDec)
            
        while (tokens.nth_data(current).lexeme == "constructor" || tokens.nth_data(current).lexeme == "function" || tokens.nth_data(current).lexeme == "method")
            non_term_subroutineDec : Node = compileSubroutineDec()
            sub_tree_root.childs.append(non_term_subroutineDec)
            
        term_right_curly_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_right_curly_brace)    
        
        return sub_tree_root
    
    //------------------------------
    
    def compileClassVarDec():Node
    
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "classVarDec"
        
        term_static_or_field : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_static_or_field)
        
        non_term_Type : Node = compileType()
        sub_tree_root.childs.append(non_term_Type)
        
        non_term_VarName : Node = compileVarName()
        sub_tree_root.childs.append(non_term_VarName)
        
        while (tokens.nth_data(current).lexeme == ",")
            term_comma : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_comma)
            
            non_term_varName : Node = compileVarName()
            sub_tree_root.childs.append(non_term_varName)
        
        term_semicolon : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_semicolon)
            
        return sub_tree_root
    
    //------------------------------
    
    def compileType():Node
        
        if (tokens.nth_data(current).lexeme == "int" || tokens.nth_data(current).lexeme == "char" || tokens.nth_data(current).lexeme == "boolean")
            term_int_or_char_or_boolean : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            return term_int_or_char_or_boolean
        return compileClassName()
    
    //------------------------------
    
    def compileSubroutineDec():Node
    
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "subroutineDec"
        
        term_constructor_or_function_or_method : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_constructor_or_function_or_method)
        
        if (tokens.nth_data(current).lexeme == "void")
            term_void : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_void)
        else
            non_term_Type : Node = compileType()
            sub_tree_root.childs.append(non_term_Type)
           
        non_term_subroutineName : Node = compileSubroutineName()
        sub_tree_root.childs.append(non_term_subroutineName)
        
        term_left_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_left_brace)
            
        non_term_parameterList : Node = compileParameterList()
        sub_tree_root.childs.append(non_term_parameterList)
            
        term_right_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_right_brace)   
         
        non_term_subroutineBody : Node = compileSubroutineBody()
        sub_tree_root.childs.append(non_term_subroutineBody)   
        
        return sub_tree_root
    
    //------------------------------
    
    def compileParameterList():Node
    
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "parameterList"
        
        if (tokens.nth_data(current).lexeme == "int" || tokens.nth_data(current).lexeme == "char" || tokens.nth_data(current).lexeme == "boolean" || tokens.nth_data(current).pattern == "identifier")
            non_term_type : Node = compileType()
            sub_tree_root.childs.append(non_term_type)
            
            non_term_varName : Node = compileVarName()
            sub_tree_root.childs.append(non_term_varName)
        
        while (tokens.nth_data(current).lexeme == ",")
            term_comma : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_comma)
            
            non_term_type : Node = compileType()
            sub_tree_root.childs.append(non_term_type)
            
            non_term_varName : Node = compileVarName()
            sub_tree_root.childs.append(non_term_varName)
        
        return sub_tree_root
    
    //------------------------------
    
    def compileSubroutineBody():Node
    
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "subroutineBody"
        
        term_left_curly_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_left_curly_brace)
        
        while (tokens.nth_data(current).lexeme == "var")
            non_term_varDec : Node = compileVarDec()
            sub_tree_root.childs.append(non_term_varDec)
            
        non_term_statements : Node = compileStatements()
        sub_tree_root.childs.append(non_term_statements)
            
        term_right_curly_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_right_curly_brace)  
        
        return sub_tree_root
    
    //------------------------------
    
    def compileVarDec():Node
    
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "varDec"
        
        term_var : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_var)
        
        non_term_Type : Node = compileType()
        sub_tree_root.childs.append(non_term_Type)
        
        non_term_VarName : Node = compileVarName()
        sub_tree_root.childs.append(non_term_VarName)
        
        while (tokens.nth_data(current).lexeme == ",")
            term_comma : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_comma)
            
            non_term_varName : Node = compileVarName()
            sub_tree_root.childs.append(non_term_varName)
        
        term_semicolon : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_semicolon)
            
        return sub_tree_root
    
    //------------------------------
    
    def compileClassName():Node
        
        term_identifier : Terminal = new Terminal(tokens.nth_data(current))
        next_token()

        return term_identifier
    
    //------------------------------
    
    def compileSubroutineName():Node
    
        term_identifier : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        
        return term_identifier
    
    //------------------------------
    
    def compileVarName():Node
        
        term_identifier : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        
        return term_identifier
    
    //------------------------------
    
    def compileStatements():Node
    
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "statements"
        
        while (tokens.nth_data(current).lexeme == "let" || tokens.nth_data(current).lexeme == "if" || tokens.nth_data(current).lexeme == "while" || tokens.nth_data(current).lexeme == "do" || tokens.nth_data(current).lexeme == "return")
            non_term_statement : Node = compileStatement()
            sub_tree_root.childs.append(non_term_statement)
        
        return sub_tree_root
    
    //------------------------------
    
    def compileStatement():Node
        
        if (tokens.nth_data(current).lexeme == "let")
            return compileLetStatement()
        
        else if (tokens.nth_data(current).lexeme == "if")
            return compileIfStatement()
            
        else if (tokens.nth_data(current).lexeme == "while")
            return compileWhileStatement()
            
        else if (tokens.nth_data(current).lexeme == "do")
            return compileDoStatement()
            
        return compileReturnStatement()
    
    //------------------------------
    
    def compileLetStatement():Node
    
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "letStatement"
        
        term_let : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_let)
        
        non_term_varName : Node = compileVarName()
        sub_tree_root.childs.append(non_term_varName)
        
        if(tokens.nth_data(current).lexeme == "[")
            term_left_square_brace : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_left_square_brace)
            
            non_term_expression : Node = compileExpression()
            sub_tree_root.childs.append(non_term_expression)
            
            term_right_square_brace : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_right_square_brace)
            
        term_equals : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_equals)
        
        non_term_expression : Node = compileExpression()
        sub_tree_root.childs.append(non_term_expression)
        
        term_semicolon : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_semicolon)
            
        return sub_tree_root
    
    //------------------------------
    
    def compileIfStatement():Node
        
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "ifStatement"
        
        term_if : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_if)
        
        term_left_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_left_brace)
        
        non_term_expression : Node = compileExpression()
            sub_tree_root.childs.append(non_term_expression)
        
        term_right_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_right_brace)
        
        term_left_curly_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_left_curly_brace)
        
        non_term_statements : Node = compileStatements()
            sub_tree_root.childs.append(non_term_statements)
            
        term_right_curly_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_right_curly_brace)
        
        if (tokens.nth_data(current).lexeme == "else")
            term_else : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_else)
            
            term_left_curly_brace2 : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_left_curly_brace2)
        
            non_term_statements2 : Node = compileStatements()
            sub_tree_root.childs.append(non_term_statements2)
            
            term_right_curly_brace2 : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_right_curly_brace2)
   
        return sub_tree_root
    
    //------------------------------
    
    def compileWhileStatement():Node
    
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "whileStatement"
        
        term_while : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_while)
        
        term_left_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_left_brace)
        
        non_term_expression : Node = compileExpression()
        sub_tree_root.childs.append(non_term_expression)
        
        term_right_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_right_brace)
        
        term_left_curly_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_left_curly_brace)
        
        non_term_statements : Node = compileStatements()
        sub_tree_root.childs.append(non_term_statements)
        
        term_right_curly_brace : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_right_curly_brace)
            
        return sub_tree_root
    
    //------------------------------
    
    def compileDoStatement():Node
    
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "doStatement"
        
        term_do : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_do)
        
        non_term_subroutinecall : Node = compileSubroutineCall()
        sub_tree_root.childs.append(non_term_subroutinecall)
        
        term_semicolon : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_semicolon)
            
        return sub_tree_root
    
    //------------------------------
    
    def compileReturnStatement():Node
        
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "returnStatement"
        
        term_return : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_return)
        
        if(tokens.nth_data(current).lexeme != ";")
            non_term_expression : Node = compileExpression()
            sub_tree_root.childs.append(non_term_expression)
        
        term_semicolon : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        sub_tree_root.childs.append(term_semicolon)
            
        return sub_tree_root
    
    //------------------------------
    
    def compileExpression():Node
        
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "expression"
        
        non_term_term : Node = compileTerm()
        sub_tree_root.childs.append(non_term_term)
        
        while (tokens.nth_data(current).lexeme == "+" || tokens.nth_data(current).lexeme == "-" || tokens.nth_data(current).lexeme == "*" || tokens.nth_data(current).lexeme == "/" || tokens.nth_data(current).lexeme == "&amp;" || tokens.nth_data(current).lexeme == "|" || tokens.nth_data(current).lexeme == "&lt;" || tokens.nth_data(current).lexeme == "&gt;" || tokens.nth_data(current).lexeme == "=")
            non_term_op : Node = compileOp()
            sub_tree_root.childs.append(non_term_op)
            
            non_term_term2 : Node = compileTerm()
            sub_tree_root.childs.append(non_term_term2)
            
        return sub_tree_root
    
    //------------------------------
    
    def compileTerm():Node
        
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "term"
        
        if (tokens.nth_data(current).pattern == "integerConstant")
            term_integerConstant : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_integerConstant)
            
        else if (tokens.nth_data(current).pattern == "stringConstant")
            term_stringConstant : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_stringConstant)
        
        else if (tokens.nth_data(current).lexeme == "true" || tokens.nth_data(current).lexeme == "false" || tokens.nth_data(current).lexeme == "null" || tokens.nth_data(current).lexeme == "this")
            non_term_keywordConstant : Node = compileKeywordConstant()
            sub_tree_root.childs.append(non_term_keywordConstant)
            
        else if (tokens.nth_data(current).lexeme == "(")
            term_left_brace : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_left_brace)
        
            non_term_expression : Node = compileExpression()
            sub_tree_root.childs.append(non_term_expression)
        
            term_right_brace : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_right_brace)
        
        else if (tokens.nth_data(current).lexeme == "-" || tokens.nth_data(current).lexeme == "~")
            non_term_unaryOp : Node = compileUnaryOp()
            sub_tree_root.childs.append(non_term_unaryOp)
            
            non_term : Node = compileTerm()
            sub_tree_root.childs.append(non_term)
            
        else if (tokens.nth_data(current+1).lexeme == "(" || tokens.nth_data(current+1).lexeme == ".")
            non_term_subroutineCall : Node = compileSubroutineCall()
            sub_tree_root.childs.append(non_term_subroutineCall)
            
        else
            non_term_varName : Node = compileVarName()
            sub_tree_root.childs.append(non_term_varName)
            
            if (tokens.nth_data(current).lexeme == "[")
                
                term_left_square_brace : Terminal = new Terminal(tokens.nth_data(current))
                next_token()
                sub_tree_root.childs.append(term_left_square_brace)
            
                non_term_expression : Node = compileExpression()
                sub_tree_root.childs.append(non_term_expression)
            
                term_right_square_brace : Terminal = new Terminal(tokens.nth_data(current))
                next_token()
                sub_tree_root.childs.append(term_right_square_brace)
                
        return sub_tree_root
    
    //------------------------------
    
    def compileSubroutineCall():Node
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "subroutineCall"
        
        if(tokens.nth_data(current+1).lexeme == "(")
            non_term_subroutineName : Node = compileSubroutineName()
            sub_tree_root.childs.append(non_term_subroutineName)
            
            term_left_brace : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_left_brace)
                
            non_term_expressionList : Node = compileExpressionList()
            sub_tree_root.childs.append(non_term_expressionList)
                
            term_right_brace : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_right_brace)  
        
        else
            non_term_className : Node = compileClassName()
            sub_tree_root.childs.append(non_term_className)
            
            term_dot : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_dot)
            
            non_term_subroutineName : Node = compileSubroutineName()
            sub_tree_root.childs.append(non_term_subroutineName)
            
            term_left_brace : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_left_brace)
                
            non_term_expressionList : Node = compileExpressionList()
            sub_tree_root.childs.append(non_term_expressionList)
                
            term_right_brace : Terminal = new Terminal(tokens.nth_data(current))
            next_token()
            sub_tree_root.childs.append(term_right_brace) 
        
        return sub_tree_root
    
    //------------------------------
    
    def compileExpressionList():Node
        
        sub_tree_root : NonTerminal = new NonTerminal()
        sub_tree_root.name = "expressionList"
        
        if(tokens.nth_data(current).lexeme != ")")
            non_term_expression : Node = compileExpression()
            sub_tree_root.childs.append(non_term_expression)
            
            while (tokens.nth_data(current).lexeme == ",")
                term_comma : Terminal = new Terminal(tokens.nth_data(current))
                next_token()
                sub_tree_root.childs.append(term_comma)
                
                non_term_expression2 : Node = compileExpression()
                sub_tree_root.childs.append(non_term_expression2)
        return sub_tree_root
    
    //------------------------------
    
    def compileOp():Node
        
        term_operator : Terminal = new Terminal(tokens.nth_data(current))
        next_token()

        return term_operator
    
    //------------------------------
    
    def compileUnaryOp():Node
    
        term_unaryoperator : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        
        return term_unaryoperator
    
    //------------------------------
    
    def compileKeywordConstant():Node
    
        term_KeyWordConstant : Terminal = new Terminal(tokens.nth_data(current))
        next_token()
        
        return term_KeyWordConstant
    