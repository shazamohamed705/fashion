import { useNavigate, useParams } from 'react-router-dom';

const ORANGE = '#C9573A';

const MOCK_USER = {
  firstName: 'Salma',
  lastName: 'Hassan',
  email: 'salma.hassan@example.com',
};

const NAV_ITEMS = [
  { label: 'Personal details', path: '/account' },
  { label: 'My orders',        path: '/account/orders' },
  { label: 'Address book',     path: '/account/addresses' },
  { label: 'Saved pieces',     path: '/account/saved' },
  { label: 'Preferences',      path: '/account/preferences' },
];

/* ── Mock orders data ─────────────────────────────────────────────────── */
const MOCK_ORDERS = {
  'NESEJ-DEMO-2030': {
    id: 'NESEJ-DEMO-2030',
    status: 'Delivered',
    items: [
      { id: 1, name: 'Relaxed linen shirt', variant: 'Oat · Size M · Qty 1', price: 'EGP 1,250', image: '/40bb3e5bf4d0c3683fdb021c735af53e470c00bf.jpg' },
      { id: 2, name: 'Soft rib tee',        variant: 'Cream · Size M · Qty 1', price: 'EGP 720',   image: '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg' },
    ],
    address: {
      label: 'Home · Default delivery address',
      name: 'Salma Hassan',
      line1: '18 El Nozha Street, Apartment 4, Floor 2',
      line2: 'Heliopolis, Cairo, Egypt',
      phone: '+20 100 123 4567',
      note: 'Sample customer details',
      email: 'salma.hassan@example.com',
    },
    subtotal:  'EGP 1,970',
    delivery:  'EGP 60',
    total:     'EGP 2,030',
  },
  'NESEJ-DEMO-1650': {
    id: 'NESEJ-DEMO-1650',
    status: 'Cancelled',
    items: [
      { id: 1, name: 'Woven midi dress', variant: 'Clay · M · Qty 1', price: 'EGP 1,710', image: '/ce36b5575235158056ba681b0c25c7743486fe47.jpg' },
    ],
    address: {
      label: 'Home · Default delivery address',
      name: 'Salma Hassan',
      line1: '18 El Nozha Street, Apartment 4, Floor 2',
      line2: 'Heliopolis, Cairo, Egypt',
      phone: '+20 100 123 4567',
      note: 'Sample customer details',
      email: 'salma.hassan@example.com',
    },
    subtotal:  'EGP 1,710',
    delivery:  'EGP 60',
    total:     'EGP 1,770',
  },
};

/* ── Sidebar ──────────────────────────────────────────────────────────── */
function Sidebar({ onSignOut }) {
  const navigate = useNavigate();
  return (
    <aside style={{ width: 155, flexShrink: 0 }}>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: '#1a1a1a', margin: '0 0 3px' }}>
          {MOCK_USER.firstName} {MOCK_USER.lastName}
        </p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', margin: 0, wordBreak: 'break-all' }}>
          {MOCK_USER.email}
        </p>
      </div>
      <nav aria-label="Account navigation">
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.label === 'My orders';
            return (
              <li key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    fontFamily: 'system-ui,sans-serif', fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? ORANGE : '#3a3a3a',
                    background: isActive ? '#FDF5F0' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? `3px solid ${ORANGE}` : '3px solid transparent',
                    padding: '8px 10px', cursor: 'pointer',
                    borderRadius: '0 6px 6px 0', transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#fafaf8'; e.currentTarget.style.color = '#1a1a1a'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3a3a3a'; }}}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div style={{ height: 1, background: '#ece8e2', margin: '16px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button type="button" onClick={() => navigate('/help')}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', textDecoration: 'underline', textUnderlineOffset: 2 }}
          onMouseEnter={e => e.currentTarget.style.color = '#555'} onMouseLeave={e => e.currentTarget.style.color = '#888'}
        >Need a hand?</button>
        <button type="button" onClick={() => navigate('/help')}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >Visit help →</button>
        <button
          type="button" onClick={onSignOut}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: 500 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}

/* ── Row in order summary card ────────────────────────────────────────── */
function SummaryRow({ label, value, bold, large, borderTop }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 0',
      borderTop: borderTop ? '1px solid #ece8e2' : 'none',
    }}>
      <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: large ? 14 : 13, fontWeight: bold ? 600 : 400, color: '#3a3a3a' }}>{label}</span>
      <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: large ? 15 : 13, fontWeight: bold ? 700 : 500, color: '#1a1a1a' }}>{value}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   OrderDetailsPage
   ═══════════════════════════════════════════════════════════════════════ */
export default function OrderDetailsPage() {
  const navigate  = useNavigate();
  const { id }    = useParams();
  const order     = MOCK_ORDERS[id];

  if (!order) {
    return (
      <div style={{ padding: 48, fontFamily: 'system-ui,sans-serif', color: '#888' }}>
        Order not found.{' '}
        <button onClick={() => navigate('/account/orders')} style={{ color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          Back to orders
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: 0, padding: 'clamp(20px,3vw,36px) clamp(40px,6%,88px)' }}>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,64px)', alignItems: 'flex-start' }}>

          {/* ── Sidebar ── */}
          <Sidebar onSignOut={() => navigate('/')} />

          {/* ── Main content ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Back link */}
            <button
              type="button"
              onClick={() => navigate('/account/orders')}
              style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 4 }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              ← Back to my orders
            </button>

            {/* Three-column: items | gap | order summary */}
            <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>

              {/* ── Left: items + address ── */}
              <div style={{ flex: 1, minWidth: 0 }}>

                {/* Section heading */}
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 400, color: '#1a1a1a', margin: '0 0 20px', lineHeight: 1.15 }}>
                  Purchased pieces
                </h2>

                {/* Item list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
                  {order.items.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      {/* Image */}
                      <div style={{ width: 80, height: 88, borderRadius: 8, overflow: 'hidden', background: '#f2eeea', flexShrink: 0 }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                      </div>
                      {/* Info */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{item.name}</p>
                        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', margin: 0 }}>{item.variant}</p>
                        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 700, color: '#1a1a1a', margin: '4px 0 0' }}>{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: '#ece8e2', marginBottom: 24 }} />

                {/* Delivery address */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 400, color: '#1a1a1a', margin: '0 0 16px' }}>
                    {order.address.label}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#3a3a3a', margin: 0 }}>{order.address.name}</p>
                    <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#3a3a3a', margin: 0 }}>{order.address.line1}</p>
                    <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#3a3a3a', margin: 0 }}>{order.address.line2}</p>
                    <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#3a3a3a', margin: 0 }}>{order.address.phone}</p>
                  </div>
                  {order.address.note && (
                    <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#aaa', margin: '12px 0 0' }}>{order.address.note}</p>
                  )}
                  {order.address.email && (
                    <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#aaa', margin: '4px 0 0' }}>
                      Contact: {order.address.email}
                    </p>
                  )}
                </div>
              </div>

              {/* ── Right: order summary + help ── */}
              <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Order total card */}
                <div style={{ background: '#FCFBF8', border: '1px solid #ece8e2', borderRadius: 12, padding: '20px 20px 16px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 400, color: '#1a1a1a', margin: '0 0 4px' }}>
                    Order total
                  </h3>
                  <SummaryRow label="Subtotal"             value={order.subtotal} />
                  <SummaryRow label="Delivery · illustrative" value={order.delivery} />
                  <SummaryRow label="Total" value={order.total} bold large borderTop />
                  <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 11, color: '#aaa', margin: '8px 0 0' }}>
                    All prices in EGP · Sample totals
                  </p>
                </div>

                {/* A little help card */}
                <div style={{ background: '#FCFBF8', border: '1px solid #ece8e2', borderRadius: 12, padding: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 400, color: '#1a1a1a', margin: '0 0 10px' }}>
                    A little help
                  </h3>
                  <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#555', lineHeight: 1.55, margin: '0 0 16px' }}>
                    Easy 14-day returns. Choose the piece you'd like to return and tell us why.
                  </p>
                  <button
                    type="button"
                    style={{
                      width: '100%', background: ORANGE, color: '#fff',
                      fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600,
                      border: 'none', borderRadius: 999, padding: '11px 16px',
                      cursor: 'pointer', marginBottom: 12,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#b84d32'}
                    onMouseLeave={e => e.currentTarget.style.background = ORANGE}
                  >
                    Request a return
                  </button>
                  <button
                    type="button"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      fontFamily: 'system-ui,sans-serif', fontSize: 13, color: ORANGE,
                      textDecoration: 'underline', textUnderlineOffset: 2,
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Contact about this order →
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .order-detail-layout { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
