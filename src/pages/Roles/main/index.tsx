import { Header,AdminCards } from '../../../components'
export const Roles = () => {
  return (
    <div>
      <Header placeholder='Search Admins'
       typeSearch={true}
       chooseFilter={true}
       UserBox={true}/>
       <div>
        <AdminCards />
       </div>
    </div>
  )
}
