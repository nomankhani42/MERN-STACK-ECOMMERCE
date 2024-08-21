import { createSlice } from "@reduxjs/toolkit";
// import { json } from "react-router";



const CartSlice=createSlice({
    name:'CartSlice',
    initialState:{
            cart: [] ,
            totalQuantities:0,
            netAmount:0
            

    },
    reducers:{
          addToCart:(state,action)=>{
                    // state.cart=[];
            if(state.cart===undefined){
                state.cart=[];
            }   
           const index=state.cart.findIndex((item)=>{
              return item._id === action.payload._id;
           })

           if(index!==-1){
              state.cart[index].quantity+=1;
          
           }
           else{
                               state.cart=[...state.cart,action.payload];
           }

        let netAmount=0;
          for(let i=0;i<state.cart.length;i++){
                  netAmount+=state.cart[i].price*state.cart[i].quantity;
          }

          state.netAmount=netAmount;
          let quantity=0;
          for(let i=0;i<state.cart.length;i++){
                  quantity+=state.cart[i].quantity;
          }
         
          state.totalQuantities=quantity;
          console.log(state)
          return state;
                
                
          },
          increaseProductQuantity:(state,action)=>{
                        // console.log(action.payload)
                        const index=state.cart.findIndex((item)=>{
                                return item._id === action.payload;
                             })
                  
                             if(index!==-1){
                                state.cart[index].quantity+=1;
                            
                             }

                             let netAmount=0;
                             for(let i=0;i<state.cart.length;i++){
                                     netAmount+=state.cart[i].price*state.cart[i].quantity;
                             }
                   
                             state.netAmount=netAmount;
                             let quantity=0;
                             for(let i=0;i<state.cart.length;i++){
                                     quantity+=state.cart[i].quantity;
                             }
                            
                             state.totalQuantities=quantity;
                             console.log(state)
                             return state;
          },
          decreaseProductQuantity:(state,action)=>{
                const index=state.cart.findIndex((item)=>{
                        return item._id === action.payload;
                     })

                     if(state.cart[index].quantity===1){
                        state.cart=state.cart.filter((item)=>item._id!==action.payload);
                     }
                     else{
                        state.cart[index].quantity-=1;
                     }

                     let netAmount=0;
                     for(let i=0;i<state.cart.length;i++){
                             netAmount+=state.cart[i].price*state.cart[i].quantity;
                     }
           
                     state.netAmount=netAmount;
                     let quantity=0;
                     for(let i=0;i<state.cart.length;i++){
                             quantity+=state.cart[i].quantity;
                     }
                    
                     state.totalQuantities=quantity;
                     console.log(state)
                     return state;
          
          },
          clearCart:(state,action)=>{
            state.cart= [] 
           state.totalQuantities=0;
            state.netAmount=0;

            return state;
          }
    }

})

export const {addToCart,increaseProductQuantity,decreaseProductQuantity,clearCart}=CartSlice.actions;
export default CartSlice.reducer;
