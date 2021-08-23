[indent=4]

//------------------------------------------------------------------------------

interface Node: Object

    def abstract get_type_name() : string

//------------------------------------------------------------------------------

class Terminal : Object implements Node
    
    prop tok : Token
    
    construct(_tok : Token)
        tok = _tok
        
    def get_type_name() : string
        return "Terminal"
        
//------------------------------------------------------------------------------

class NonTerminal : Object implements Node
    
    prop name: string
    childs : List of Node
    
    def get_type_name() : string
        return "NonTerminal"
