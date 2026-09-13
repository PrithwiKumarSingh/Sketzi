"use client"
const strokeColor = [
     "#ff3399", "#B86200", "#D3D3D3", "#56A2E8", "#FF8383"
]
const backgroundColor = [
    "#181604", "#121212", "#13171B", "#FDF8F6", "#FFFFFF"
]


export default function Sidebar({strokColor,setBgColor, setStrokColor, setIsMenuActive}:{
    strokColor : string;
    setStrokColor : (value:string)=>void;
    setIsMenuActive : (val:boolean)=>void;
    setBgColor : (val:string)=>void;
}){
    return (
        <div className=" absolute top-17 left-9 bg-[#1B1B1F] p-4 rounded-xl border border-gray-700 shadow-xl">
            <div >
                <div className="text-sm font-medium text-gray-300">
                    Stroke strokColor
                </div>
                <div className="flex gap-2 my-1">
                    {
                        strokeColor.map((item)=> <button key={item}
                        style={{backgroundColor : item}}
                        onClick={()=>{
                            setStrokColor(item)}}
                        className={`h-6 w-6 cursor-pointer hover:scale-105 rounded
                        ${strokColor === item ? "ring-2 ring-white":""}`}
                        >

                        </button>)
                    }
                </div>
            </div>
            <div className="my-2">
                <div className="text-sm font-medium text-gray-300">
                    Background strokColor
                </div>
                <div className="flex gap-2 my-1">
                    {
                        backgroundColor.map((item)=> <button 
                        onClick={()=>setBgColor(item)}
                        key={item}
                        style={{backgroundColor : item}}
                        
                        className={`h-6 w-6 cursor-pointer hover:scale-105 rounded
                        ${strokColor === item ? "ring-2 ring-white":""}`}
                        >

                        </button>)
                    }
                </div>
            </div>
        </div>
    )
}