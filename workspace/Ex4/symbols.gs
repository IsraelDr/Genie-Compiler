[indent=4]

//------------------------------------------------------------------------------

enum Kind
    FIELD
    STATIC
    ARG
    VAR

//------------------------------------------------------------------------------

class Symbol
    prop name: string
    type: string
    prop kind: Kind
    prop index: int
    
    construct(_name: string, _type: string, _kind: Kind, _index: int)
        name = _name
        type = _type
        kind = _kind
        index = _index
        
//------------------------------------------------------------------------------

class SymbolTable

    prop className: string
    prop subroutineName: string
    
    classTable : List of Symbol
    subroutineTable : List of Symbol
    
    prop fieldCount: int
    prop staticCount: int
    prop argCount: int
    prop varCount: int
    
    construct(_className: string)
        className = _className
        classTable = new List of Symbol()
        subroutineTable = new List of Symbol()
        fieldCount = 0
        staticCount = 0
        
    def startSubroutine(_subroutineName: string)
        subroutineName = _subroutineName
        subroutineTable = new List of Symbol()
        argCount = 0
        varCount = 0
        
    def add(_name: string, _type: string, _kind: Kind)
        
        i: int = 0
        
        case _kind
            when Kind.FIELD
                i = fieldCount
                fieldCount += 1
            when Kind.STATIC
                i = staticCount
                staticCount += 1
            when Kind.ARG
                i = argCount
                argCount += 1
            default
                i = varCount
                varCount += 1
            
        sym: Symbol = new Symbol(_name,_type,_kind,i)
        
        if (_kind == Kind.FIELD || _kind == Kind.STATIC)
            classTable.append(sym)
        else
            subroutineTable.append(sym)
    
    def find(_name : string) : Symbol?
        if(subroutineTable.length()>0)
            for var i=0 to (subroutineTable.length() - 1)
                if(subroutineTable.nth_data(i).name.to_string()==_name)
                    return subroutineTable.nth_data(i)
        if(classTable.length()>0)
            for var i=0 to (classTable.length() - 1)
                if(classTable.nth_data(i).name.to_string()==_name)
                    return classTable.nth_data(i)
        return null
