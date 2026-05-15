import { Component, ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class MapErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={{ background: 'var(--cream)' }}>
          <div className="boutique">
            <div
              className="boutique__map"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 420, background: 'var(--cream-2)' }}
            >
              <a
                href="https://www.google.com/maps/place/Calle+Calderería+Nueva,+18010+Albaicín,+Granada"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--gold)', textAlign: 'center', lineHeight: 1.6 }}
              >
                Calle Calderería Nueva<br />
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>Ver en Google Maps →</span>
              </a>
            </div>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
