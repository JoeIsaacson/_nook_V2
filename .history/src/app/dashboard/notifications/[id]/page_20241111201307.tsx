'use client'
import { useRouter, useParams } from 'next/navigation'

export default function NotificationDetail() {
  const router = useRouter()
  const params = useParams()
  
  console.log(params.id);

  // Get notification content based on ID
  const getNotificationContent = () => {
    switch(params.id) {
      case '1':
        return {
          title: 'You just received a referral bonus',
          time: '4 hours ago',
          content: 'This will be reinvested back into your main balance earning 4.4% APY',
          class: 'notification-success'
        }
      case '2':
        return {
          title: 'Welcome to nook!',
          time: '4 hours ago',
          content: 'Were excited to have you join us. Start exploring our platform to discover all the features available to you.',
          class: 'notification-welcome'
        }
      case '3':
        return {
          title: 'Earn $50 for every friend you refer',
          time: '1 day ago',
          content: 'We see you are a believer. Earn $50 for every friend you refer.',
          class: 'notification-referral'
        }
      default:
        return {
          title: 'Notification not found',
          time: '',
          content: 'This notification does not exist.',
          class: 'notification-default'
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

        <div className={`container notification-detail-content mt-4 ${notification.class}`}>
          {/* Circle Success */}
          <div className="circle-success mb-4 text-center">
            <i className="fas fa-check fa-4x"></i>
          </div>
          {/* Core content */}
          <h1 className="display-2">{notification.title}</h1>
          {/* <p className="text-muted small">{notification.time}</p> */}
          <p className="mt-4">{notification.content}</p>
          {/* Footer */}
          <footer className="">
            <div className="py-3 text-center">
              <button 
                className="btn btn-transparent w-100 mt-5"
                onClick={() => router.push('/dashboard')}
                >
                <span>Done</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}