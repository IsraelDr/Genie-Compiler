[indent=4]

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
    
    i : int = 0
    fileName : string
    while ((fileName = directory.read_name()) != null)
        if fileName.has_suffix(".vm") // checking if the file is a "vm" file
            
        print Path.build_filename(path,fileName)
        