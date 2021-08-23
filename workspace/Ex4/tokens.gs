[indent=4]

//------------------------------------------------------------------------------

class Token
    prop lexeme: string
    prop pattern: string
    
    construct(_pattern: string, _lexeme: string)
        lexeme = _lexeme
        pattern = _pattern
        