'use client'
import { useRouter, useParams } from 'next/navigation'

export default function NotificationDetail() {
  const router = useRouter()
  const params = useParams()
  
  // Get notification content based on ID
  const getNotificationContent = () => {
    switch(params.id) {
      case '1':
        return {
          title: 'You just received a referral bonus',
          time: '4 hours ago',
          content: 'Congratulations! Youve earned a referral bonus for bringing a new user to the platform. The bonus has been added to your account.'
        }
      case '2':
        return {
          title: 'Welcome to nook!',
          time: '4 hours ago',
          content: 'Were excited to have you join us. Start exploring our platform to discover all the features available to you.'
        }
      case '3':
        return {
          title: 'Earn $50 for every friend you refer',
          time: '1 day ago',
          content: 'We see you are a believer. Earn $50 for every friend you refer.'
        }
      default:
        return {
          title: 'Notification not found',
          time: '',
          content: 'This notification does not exist.'
        }
    }
  }

  const notification = getNotificationContent()

  return (
    <>
      <div className="notification-detail background-image-80 vh-100">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <button 
              className="btn"
              onClick={() => router.push('/dashboard/notifications')}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>
        </nav>

        <div className="container mt-4">
          <h5>{notification.title}</h5>
          <p className="text-muted small">{notification.time}</p>
          <p className="mt-4">{notification.content}</p>
          {/* Footer */}
          <footer className="">
            <div className="py-3 text-center">
              <button className="btn btn-transparent btn-primary w-100 btn-left-justify mt-5">
              <span>Deposit</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}