[indent=4]

//------------------------------------------------------------------------------

class JackTokenizer
    input:string
    current: int
    buffer:string
    result: List of Token
    
    symbols:array of string={"{","}","(",")","[","]",".",",",";","+","-","*","/","&","|","<",">","=","~"}
   
    keywords: array of string = {"class","constructor","function","method","field","static","var",
    "int","char","boolean","void","true","false","null","this","let","do","if","else","while","return"}
    
    construct(_input:string)
        input=_input
        current = 0
    
    def nextChar()
        current = current + 1
        
    def tokenize():List of Token
        q0()
        return result.copy()
    
    def q0()
        
        while (!get_to_the_end())
            // skipping whitespaces
            while (input[current].isspace() && !get_to_the_end())
                nextChar()
            
            // skipping comments //    
            if (current + 1 < input.length && input[current].to_string() == "/" && input[current+1].to_string() == "/")
                nextChar()
                nextChar()
                while (!get_to_the_end() && input[current].to_string() != "\r" && input[current].to_string() != "\n")
                    nextChar()
            
            // skipping comments /** ... */    
            if (current + 2 < input.length && input[current].to_string() == "/" && input[current+1].to_string() == "*" && input[current+2].to_string() == "*")
                nextChar()
                nextChar()
                nextChar()
                while (current + 1 < input.length && !(input[current].to_string() == "*" && input[current+1].to_string() == "/"))
                    nextChar()
                if (current + 1 < input.length)
                    nextChar()
                    nextChar()
                
            
            // checking that we didn't reach the end of the input file
            if (get_to_the_end())
                return
            
            // tokenize identifiers or keywords
            if (input[current].isalpha() || input[current].to_string() == "_")
                q2()
        
            // tokenize numbers
            else if(input[current].isdigit())
                q3()
        
            // tokenize symbols
            else if(containsString(symbols,input[current].to_string()))
                q4()
            
            // tokenize stringsConstant
            else if(input[current].to_string() == '"'.to_string())
                q5()
            
    
    // tokenizing  identifiers or keywords   
    def q2()
        buffer = ""
        while ((input[current].isalpha() || input[current].isdigit() || input[current].to_string() == "_") && !get_to_the_end())
            buffer += input[current].to_string()
            nextChar()
        if (containsString(keywords,buffer))
            tok:Token = new Token("keyword", buffer)
            result.append(tok)
        else
            tok: Token = new Token("identifier", buffer)
            result.append(tok)
            
    // tokenizing numbers 
    def q3()
        buffer = ""
        while (input[current].isdigit() && ! get_to_the_end())
            buffer += input[current].to_string()
            nextChar()
        tok: Token = new Token("integerConstant", buffer)
        result.append(tok)
            
    // tokenizing symbols         
    def q4()
        buffer = input[current].to_string()
        nextChar()
        if(buffer=="<")
            buffer="&lt;"
        else if(buffer==">")
            buffer="&gt;"
        else if(buffer=="&")
            buffer="&amp;"
        tok: Token = new Token("symbol", buffer)
        result.append(tok)
    
    // tokenizing stringsConstant    
    def q5()
        nextChar()
        buffer = ""
        while (!get_to_the_end() && input[current].to_string() != '"'.to_string())
            buffer += input[current].to_string()
            nextChar()
        if (!get_to_the_end())
            nextChar()
        tok: Token = new Token("stringConstant", buffer)
        result.append(tok)
        
    def get_to_the_end():bool
        if(current >= input.length)
            return true
        return false
        
        
def containsString(arr:array of string, str:string):bool
    i:int = 0
    while(i<arr.length)
        if(arr[i]==str)
            return true
        i++
    return false
        
        
        
        