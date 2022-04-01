import Style from "./Checkbox.module.scss"
import clsx from "clsx"

function Checkbox(prop){
   
    const {array,state}=prop
    const [itemState,setItemState]=state
    const callback= (id)=>{
        const result =itemState.includes(id)// xử lí bỏ check 
          if(result)
          {
            const a= itemState.filter(item=>item !== id)
            setItemState(prev=> a)
          }else{
            setItemState(prev=> [...prev,id])
          }
      } 
    return(
        <>
        {
            array.map((item)=>{
            return(
                <div key={item.id} className={ clsx( Style.checkboxFour)}>
                    <input id={item.id} type='checkbox'className={clsx(Style.fillerBlockCheck,"me-2")} 
                    checked={itemState.includes(item.id)}                                                   
                                                // nếu mảng fillerStatusCheckbox có chứa phần tử giống với id hiện tại 
                                                // thì attribute checked sẽ trả về true là checkbox tại vị trí đó sẽ đc check
                    onChange={()=>callback(item.id)} 
                                                //onChange cần gọi đến một callback
                                                //nếu chekbox có thay đổi trạng thái 
                                                //thì hàm callbackStatuscheckbox sẽ được gọi
                    />
                    
                    <label htmlFor={item.id} className={clsx(Style.labelCheck)}>{item.name}</label> 
                </div>
            )
            })

        } 
        </>
    )
}
export default Checkbox