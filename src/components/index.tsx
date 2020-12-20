import React,{CSSProperties,ReactNode,useState,useMemo,useEffect} from 'react';
import Draggable, {DraggableData, DraggableEvent, DraggableProps} from 'react-draggable'
export interface IPositionState {
  x:number,
  y:number
}
export interface IOptionsType {
  wrapperStyle?: CSSProperties;
  innerStyle?: CSSProperties;
  intervalDelay?: number;
ratioSpeed?: IPositionState;
draggableProps?:Partial<DraggableProps>;
innerContent?:ReactNode;

}
export function useGetBall(setState: React.Dispatch<React.SetStateAction<IPositionState>>, options?:IOptionsType):[
  ReactNode,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  IPositionState,
  React.Dispatch<React.SetStateAction<IPositionState>>
]{
  const [isDrag, setIsDrag] = useState(false);
  const [controlState, setControlState] = useState({x:0,y:0})
  const defaultOption:Required<IOptionsType> = useMemo(() => {
    return {
      wrapperStyle: wrapperStyle,
      innerStyle: innerStyle,
      intervalDelay:20,
      ratioSpeed:{x:1,y:1},
      draggableProps: {
        positon:{x:0,y:0},
        bounds:'parent',
        onStart: () => {
          setIsDrag(true)
        },
        onDrag:(e:DraggableEvent,data:DraggableData) => {
          setControlState({x:data.x,y:data.y})
        },
        onStop:() => {
          setIsDrag(false)
        }
      },
      innerContent: null,
    }
  },[])
  const mergeOption:Required<IOptionsType> = useMemo(() => {

    const userDraggableProps = options?.draggableProps;
    const newDraggableProps = {
      ...defaultOption.draggableProps,
      userDraggableProps
    }
    const userWstyle = options?.wrapperStyle;
    const userIstyle = options?.innerStyle;
    const newWstyle = {...defaultOption.wrapperStyle, ...userWstyle}
    const newIstyle = {...defaultOption.innerStyle, ...userIstyle}
    return {
      wrapperStyle:newWstyle,
      innerStyle:newIstyle,
      intervalDelay:options?.intervalDelay ? options.intervalDelay:defaultOption.intervalDelay,
      ratioSpeed:options?.ratioSpeed ?options.ratioSpeed:defaultOption.ratioSpeed,
      draggableProps:newDraggableProps,
      innerContent: options?.innerContent?options.innerContent:null,


    }

  },[
    defaultOption.draggableProps,
    defaultOption.innerStyle,
    defaultOption.intervalDelay,
    defaultOption.ratioSpeed,
    defaultOption.wrapperStyle,
    options,
  ])

  useEffect(() => {
    let timer:number;
    if(isDrag) {
      const fn=() => {
        setState((v) => {
          let extraX = controlState.x;
          let extraY = controlState.y;
          if(mergeOption.ratioSpeed.x){
            extraX = extraX * mergeOption.ratioSpeed.x;
          }
          if(mergeOption.ratioSpeed.y){
            extraY = extraY * mergeOption.ratioSpeed.y;
          }
          return {
            x:v.x+extraX,
            y:v.y+extraY
          }
        })
      }
      timer = window.setInterval(() => {
        fn()
      },mergeOption.intervalDelay)
    }
    return () => {
      window.clearInterval(timer)
    }
  },[
    controlState,
    isDrag,
    mergeOption.intervalDelay,
    mergeOption.ratioSpeed,
    setState
  ])

  const render = (
    <div style={mergeOption.wrapperStyle}>
      <Draggable>
        <div style={mergeOption.innerStyle}>
          {mergeOption.innerContent}
        </div>
      </Draggable>
    </div>
  )
  return [render, isDrag,setIsDrag, controlState,setControlState]
}

export default useGetBall;