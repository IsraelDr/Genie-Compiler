//SP=256
@256    // A=256
D=A    // D=A=256
@SP    // A=SP=0
M=D    // M[SP]=D=256

//push Sys.init.ReturnAddress0
@Sys.init.ReturnAddress0    // A=some_constant
D=A    // D=A=some_constant
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=some_constant
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push LCL
@LCL    // A=LCL
D=M    // D=M[LCL]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push ARG
@ARG    // A=ARG
D=M    // D=M[ARG]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push THIS
@THIS    // A=THIS
D=M    // D=M[THIS]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push THAT
@THAT    // A=THAT
D=M    // D=M[THAT]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//ARG = SP-(n+5) 
@SP    // A=SP=0
D=M    // D=RAM[SP]
@5    // A=new_variable=n+5
D=D-A    // D=RAM[SP]-new_variable
@ARG    // A=ARG=2
M=D    // M[ARG]=D

//LCL=SP 
@SP    // A=SP=0
D=M    // D=RAM[SP]
@LCL    // A=LCL=1
M=D    // M[LCL]=D

//goto Sys.init 
@Sys.init    // A refers to the lable 'Sys.init'
0;JMP    // Always Jumps

//(label Sys.init.ReturnAddress0) 
(Sys.init.ReturnAddress0)    // label

// function Main.fibonacci
//(label Main.fibonacci) 
(Main.fibonacci)    // label

//repeat 0 times:
//	push 0
@0              // A=#local_variables
D=A              // D=A=#local_variables
(Main.fibonacci.Loop_start)    // label

@Main.fibonacci.Loop_end    // A refers to the lable 'Main.fibonacci.Loop_end + '
D;JEQ    // Jumps if D=#local_variables is zero
@SP    // A=SP=0
A=M    // A=RAM[SP]
M=0    // RAM[RAM[SP]]=0
@SP    // A=SP=0
M=M+1    // RAM[SP]=RAM[SP]+1
@Main.fibonacci.Loop_start    // A refers to the lable 'Main.fibonacci.Loop_start + '
D=D-1;JNE    // Jumps if D-1 is not zero
(Main.fibonacci.Loop_end)    // label

// push argument 0
@ARG    // A=ARG=2
D=M    // D=M[ARG]=first_arg_location
@0    // A=#arg
A=D+A    // A=first_arg_location+#arg=desirable_arg_location
D=M    // D=M[desirable_arg_location]=desirable_arg
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

// push constant 2
@2    // A=some_constant
D=A    // D=A=some_constant
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=some_constant
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

// lt
@SP    // A=SP=0
M=M-1    // M[SP]=M[SP]-1
A=M    // A=M[SP]
D=M    // D=M[M[SP]]=second_arg
A=A-1    // A=M[SP]-1
D=M-D    // D=M[M[SP]-1]-D=first_arg-second_arg=result
@IS_LESS0    // A refers to the lable IS_LESS0
D;JLT    // Jumps if D less then 0
D=0    // D=0 means false
@END_LESS0    // A refers to the lable END0
0;JMP    // Always Jumps
(IS_LESS0)    // label
D=-1    // D=-1 means true
(END_LESS0)    // label
@SP    // A=SP=0
A=M-1    // A=M[SP]-1
M=D    // M[M[SP]-1]=D=true/false

// if-goto IF_TRUE
@SP    // A=SP=0
M=M-1    // RAM[SP]=RAM[SP]-1
A=M    // A=RAM[SP]
D=M    // D=RAM[RAM[SP]]=top_most_stack_element
@IF_TRUE    // A refers to the lable 'IF_TRUE'
D;JNE    // Jumps if top_most_stack_element is not zero

// goto IF_FALSE
@IF_FALSE    // A refers to the lable 'IF_FALSE'
0;JMP    // Always Jumps

// label IF_TRUE
(IF_TRUE)    // label

// push argument 0
@ARG    // A=ARG=2
D=M    // D=M[ARG]=first_arg_location
@0    // A=#arg
A=D+A    // A=first_arg_location+#arg=desirable_arg_location
D=M    // D=M[desirable_arg_location]=desirable_arg
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

// return 
//FRAME = LCL
@LCL    // A=LCL 
D=M    // D=RAM[LCL]
@FRAME    // A=FRAME; 'FRAME' refers to some mem. location
M=D    // RAM[FRAME]=D=RAM[LCL]
//RET=*(FRAME-5)
@5    // A=5
D=A    // D=A=5
@FRAME    // A=FRAME
A=M-D    // A=RAM[FRAME]-5
D=M    // D=RAM[RAM[FRAME]-5]
@RET    // A=RET
M=D    // M[RET]=D==RAM[FRAME-5]

//*ARG = pop()
@SP    // A=SP=0
M=M-1    // RAM[SP]=RAM[SP]-1
A=M    // A=RAM[SP]
D=M    // D=RAM[RAM[SP]]=return_value
@ARG    // A=ARG
A=M    // A=RAM[ARG]
M=D    // RAM[RAM[ARG]]=D=return_value

//SP = ARG+1
@ARG    // A=ARG
D=M    // D=RAM[ARG]
@SP    // A=SP=0
M=D+1    // RAM[SP]=D+1

//THAT=*(FRAME-1)
@1    // A=1
D=A    // D=A=1
@FRAME    // A=FRAME
A=M-D    // A=RAM[FRAME]-1
D=M    // D=RAM[RAM[FRAME]-1]
@THAT    // A=THAT
M=D    // M[THAT]=D==RAM[FRAME-1]

//THIS=*(FRAME-2)
@2    // A=2
D=A    // D=A=2
@FRAME    // A=FRAME
A=M-D    // A=RAM[FRAME]-2
D=M    // D=RAM[RAM[FRAME]-2]
@THIS    // A=THIS
M=D    // M[THIS]=D==RAM[FRAME-2]

//ARG=*(FRAME-3)
@3    // A=3
D=A    // D=A=3
@FRAME    // A=FRAME
A=M-D    // A=RAM[FRAME]-3
D=M    // D=RAM[RAM[FRAME]-3]
@ARG    // A=ARG
M=D    // M[ARG]=D==RAM[FRAME-3]

//LCL=*(FRAME-4)
@4    // A=4
D=A    // D=A=4
@FRAME    // A=FRAME
A=M-D    // A=RAM[FRAME]-4
D=M    // D=RAM[RAM[FRAME]-4]
@LCL    // A=LCL
M=D    // M[LCL]=D==RAM[FRAME-4]

//goto RET 
@RET    // A=RET
A=M    // A=RAM[RET]=return_address
0;JMP    // Always Jumps

// label IF_FALSE
(IF_FALSE)    // label

// push argument 0
@ARG    // A=ARG=2
D=M    // D=M[ARG]=first_arg_location
@0    // A=#arg
A=D+A    // A=first_arg_location+#arg=desirable_arg_location
D=M    // D=M[desirable_arg_location]=desirable_arg
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

// push constant 2
@2    // A=some_constant
D=A    // D=A=some_constant
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=some_constant
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

// sub
@SP    // A=SP=0
M=M-1    // M[SP]=M[SP]-1
A=M    // A=M[SP]
D=M    // D=M[A]=second_arg
A=A-1    // A=A-1
D=M-D    // D=M[A]-D=first_arg-second_arg=result
M=D    // M[A]=D=result

// call Main.fibonacci
//push Main.fibonacci.ReturnAddress1
@Main.fibonacci.ReturnAddress1    // A=some_constant
D=A    // D=A=some_constant
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=some_constant
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push LCL
@LCL    // A=LCL
D=M    // D=M[LCL]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push ARG
@ARG    // A=ARG
D=M    // D=M[ARG]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push THIS
@THIS    // A=THIS
D=M    // D=M[THIS]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push THAT
@THAT    // A=THAT
D=M    // D=M[THAT]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//ARG = SP-(n+5) 
@SP    // A=SP=0
D=M    // D=RAM[SP]
@6    // A=new_variable=n+5
D=D-A    // D=RAM[SP]-new_variable
@ARG    // A=ARG=2
M=D    // M[ARG]=D

//LCL=SP 
@SP    // A=SP=0
D=M    // D=RAM[SP]
@LCL    // A=LCL=1
M=D    // M[LCL]=D

//goto Main.fibonacci 
@Main.fibonacci    // A refers to the lable 'Main.fibonacci'
0;JMP    // Always Jumps

//(label Main.fibonacci.ReturnAddress1) 
(Main.fibonacci.ReturnAddress1)    // label

// push argument 0
@ARG    // A=ARG=2
D=M    // D=M[ARG]=first_arg_location
@0    // A=#arg
A=D+A    // A=first_arg_location+#arg=desirable_arg_location
D=M    // D=M[desirable_arg_location]=desirable_arg
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

// push constant 1
@1    // A=some_constant
D=A    // D=A=some_constant
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=some_constant
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

// sub
@SP    // A=SP=0
M=M-1    // M[SP]=M[SP]-1
A=M    // A=M[SP]
D=M    // D=M[A]=second_arg
A=A-1    // A=A-1
D=M-D    // D=M[A]-D=first_arg-second_arg=result
M=D    // M[A]=D=result

// call Main.fibonacci
//push Main.fibonacci.ReturnAddress2
@Main.fibonacci.ReturnAddress2    // A=some_constant
D=A    // D=A=some_constant
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=some_constant
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push LCL
@LCL    // A=LCL
D=M    // D=M[LCL]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push ARG
@ARG    // A=ARG
D=M    // D=M[ARG]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push THIS
@THIS    // A=THIS
D=M    // D=M[THIS]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push THAT
@THAT    // A=THAT
D=M    // D=M[THAT]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//ARG = SP-(n+5) 
@SP    // A=SP=0
D=M    // D=RAM[SP]
@6    // A=new_variable=n+5
D=D-A    // D=RAM[SP]-new_variable
@ARG    // A=ARG=2
M=D    // M[ARG]=D

//LCL=SP 
@SP    // A=SP=0
D=M    // D=RAM[SP]
@LCL    // A=LCL=1
M=D    // M[LCL]=D

//goto Main.fibonacci 
@Main.fibonacci    // A refers to the lable 'Main.fibonacci'
0;JMP    // Always Jumps

//(label Main.fibonacci.ReturnAddress2) 
(Main.fibonacci.ReturnAddress2)    // label

// add
@SP    // A=SP=0
M=M-1    // M[SP]=M[SP]-1
A=M    // A=M[SP]
D=M    // D=M[A]=second_arg
A=A-1    // A=A-1
D=D+M    // D=D+M[A]=second_arg+first_arg=result
M=D    // M[A]=D=result

// return 
//FRAME = LCL
@LCL    // A=LCL 
D=M    // D=RAM[LCL]
@FRAME    // A=FRAME; 'FRAME' refers to some mem. location
M=D    // RAM[FRAME]=D=RAM[LCL]
//RET=*(FRAME-5)
@5    // A=5
D=A    // D=A=5
@FRAME    // A=FRAME
A=M-D    // A=RAM[FRAME]-5
D=M    // D=RAM[RAM[FRAME]-5]
@RET    // A=RET
M=D    // M[RET]=D==RAM[FRAME-5]

//*ARG = pop()
@SP    // A=SP=0
M=M-1    // RAM[SP]=RAM[SP]-1
A=M    // A=RAM[SP]
D=M    // D=RAM[RAM[SP]]=return_value
@ARG    // A=ARG
A=M    // A=RAM[ARG]
M=D    // RAM[RAM[ARG]]=D=return_value

//SP = ARG+1
@ARG    // A=ARG
D=M    // D=RAM[ARG]
@SP    // A=SP=0
M=D+1    // RAM[SP]=D+1

//THAT=*(FRAME-1)
@1    // A=1
D=A    // D=A=1
@FRAME    // A=FRAME
A=M-D    // A=RAM[FRAME]-1
D=M    // D=RAM[RAM[FRAME]-1]
@THAT    // A=THAT
M=D    // M[THAT]=D==RAM[FRAME-1]

//THIS=*(FRAME-2)
@2    // A=2
D=A    // D=A=2
@FRAME    // A=FRAME
A=M-D    // A=RAM[FRAME]-2
D=M    // D=RAM[RAM[FRAME]-2]
@THIS    // A=THIS
M=D    // M[THIS]=D==RAM[FRAME-2]

//ARG=*(FRAME-3)
@3    // A=3
D=A    // D=A=3
@FRAME    // A=FRAME
A=M-D    // A=RAM[FRAME]-3
D=M    // D=RAM[RAM[FRAME]-3]
@ARG    // A=ARG
M=D    // M[ARG]=D==RAM[FRAME-3]

//LCL=*(FRAME-4)
@4    // A=4
D=A    // D=A=4
@FRAME    // A=FRAME
A=M-D    // A=RAM[FRAME]-4
D=M    // D=RAM[RAM[FRAME]-4]
@LCL    // A=LCL
M=D    // M[LCL]=D==RAM[FRAME-4]

//goto RET 
@RET    // A=RET
A=M    // A=RAM[RET]=return_address
0;JMP    // Always Jumps

// function Sys.init
//(label Sys.init) 
(Sys.init)    // label

//repeat 0 times:
//	push 0
@0              // A=#local_variables
D=A              // D=A=#local_variables
(Sys.init.Loop_start)    // label

@Sys.init.Loop_end    // A refers to the lable 'Sys.init.Loop_end + '
D;JEQ    // Jumps if D=#local_variables is zero
@SP    // A=SP=0
A=M    // A=RAM[SP]
M=0    // RAM[RAM[SP]]=0
@SP    // A=SP=0
M=M+1    // RAM[SP]=RAM[SP]+1
@Sys.init.Loop_start    // A refers to the lable 'Sys.init.Loop_start + '
D=D-1;JNE    // Jumps if D-1 is not zero
(Sys.init.Loop_end)    // label

// push constant 4
@4    // A=some_constant
D=A    // D=A=some_constant
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=some_constant
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

// call Main.fibonacci
//push Main.fibonacci.ReturnAddress3
@Main.fibonacci.ReturnAddress3    // A=some_constant
D=A    // D=A=some_constant
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=some_constant
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push LCL
@LCL    // A=LCL
D=M    // D=M[LCL]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push ARG
@ARG    // A=ARG
D=M    // D=M[ARG]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push THIS
@THIS    // A=THIS
D=M    // D=M[THIS]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//push THAT
@THAT    // A=THAT
D=M    // D=M[THAT]=first_arg_location
@SP    // A=SP=0
A=M    // A=M[SP]
M=D    // M[M[SP]]=D=desirable_arg
@SP    // A=SP=0
M=M+1    // M[SP]=M[SP]+1

//ARG = SP-(n+5) 
@SP    // A=SP=0
D=M    // D=RAM[SP]
@6    // A=new_variable=n+5
D=D-A    // D=RAM[SP]-new_variable
@ARG    // A=ARG=2
M=D    // M[ARG]=D

//LCL=SP 
@SP    // A=SP=0
D=M    // D=RAM[SP]
@LCL    // A=LCL=1
M=D    // M[LCL]=D

//goto Main.fibonacci 
@Main.fibonacci    // A refers to the lable 'Main.fibonacci'
0;JMP    // Always Jumps

//(label Main.fibonacci.ReturnAddress3) 
(Main.fibonacci.ReturnAddress3)    // label

// label WHILE
(WHILE)    // label

// goto WHILE
@WHILE    // A refers to the lable 'WHILE'
0;JMP    // Always Jumps

