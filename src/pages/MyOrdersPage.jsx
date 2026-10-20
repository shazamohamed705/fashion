import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const ORANGE = '#C9573A';

const MOCK_USER = {
  firstName: 'Salma',
  lastName: 'Hassan',
  email: 'salma.hassan@example.com',
};

const MOCK_ORDERS = [
  {
    id: 'NESEJ-DEMO-2030',
    date: '08 October 2026',
    status: 'Delivered',
    items: [
      { name: 'Relaxed linen shirt × 2', detail: 'Oat · Size M · Qty 1 each' },
    ],
    itemsCount: 2,
    total: 'EGP 2,030',
    priceNote: 'EGP 1,250 each',
  },
  {
    id: 'NESEJ-DEMO-1650',
    date: '02 September 2026',
    status: 'Cancelled',
    items: [
      { name: 'Woven midi dress', detail: 'Clay · M' },
    ],
    itemsCount: 1,
    total: 'EGP 1,710',
    priceNote: 'Merchandise EGP 1,850\nIllustrative delivery EGP 60',
    totalStrike: true,
  },
];

const NAV_ITEMS = [
  { label: 'Personal details', path: '/account' },
  { label: 'My orders',        path: '/account/orders' },
  { label: 'Address book',     path: '/account/addresses' },
  { label: 'Saved pieces',     path: '/account/saved' },
  { label: 'Preferences',      path: '/account/preferences' },
];

const STATUS_FILTERS = ['All orders (2)', 'Delivered (1)', 'Cancelled (1)'];

/* ── Status badge ── */
function StatusBadge({ status }) {
  const colors = {
    Delivered: { color: '#166534', bg: '#f0fdf4' },
    Cancelled: { color: '#991b1b', bg: '#fef2f2' },
    Processing:{ color: '#92400e', bg: '#fffbeb' },
  };
  const s = colors[status] || { color: '#555', bg: '#f5f5f5' };
  return (
    <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 500, color: s.color, background: s.bg, borderRadius: 999, padding: '3px 10px', whiteSpace: 'nowrap' }}>
      {status}
    </span>
  );
}

/* ── Sidebar ── */
function Sidebar({ activeItem, onSignOut }) {
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
            const isActive = item.label === activeItem;
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

/* ═══════════════════════════════════════════════════════════════════════
   MyOrdersPage
   ═══════════════════════════════════════════════════════════════════════ */
export default function MyOrdersPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All orders (2)');

  const filteredOrders = MOCK_ORDERS.filter(o => {
    if (activeFilter.startsWith('All')) return true;
    return activeFilter.startsWith(o.status);
  });

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: 0, padding: 'clamp(20px,3vw,36px) clamp(40px,6%,88px)' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            {[{ label: 'Home', path: '/' }, { label: 'My account', path: '/account' }, { label: 'My orders', path: '/account/orders' }].map((c, i, arr) => (
              <li key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i < arr.length - 1 ? (
                  <><Link to={c.path} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'} onMouseLeave={e => e.currentTarget.style.color = '#888'}
                  >{c.label}</Link><span style={{ color: '#ccc', fontSize: 12 }}>/</span></>
                ) : (
                  <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#3a3a3a' }} aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Page heading */}
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 6px', lineHeight: 1.1 }}>
          My orders
        </h1>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#888', margin: 0 }}>
          The pieces you chose, and the journeys they take.
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: '#ece8e2', margin: '16px 0 28px' }} />

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,64px)', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <Sidebar activeItem="My orders" onSignOut={() => navigate('/')} />

          {/* Right: orders */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 24, borderBottom: '1px solid #ece8e2', paddingBottom: 0 }}>
              {STATUS_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    fontFamily: 'system-ui,sans-serif', fontSize: 13,
                    fontWeight: activeFilter === f ? 600 : 400,
                    color: activeFilter === f ? '#1a1a1a' : '#888',
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '0 0 12px',
                    borderBottom: activeFilter === f ? `2px solid #1a1a1a` : '2px solid transparent',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { if (activeFilter !== f) e.currentTarget.style.color = '#3a3a3a'; }}
                  onMouseLeave={e => { if (activeFilter !== f) e.currentTarget.style.color = '#888'; }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Table wrapper with background */}
            <div style={{ background: '#FCFBF8', borderRadius: 10, overflow: 'hidden', border: '1px solid #f0ece6' }}>

              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '160px 120px 100px 1fr 110px 140px', gap: 12, padding: '12px 16px', borderBottom: '1px solid #f0ece6' }}>
                {['Order #', 'Date', 'Status', 'Items', 'Total', 'Actions'].map(h => (
                  <span key={h} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 500, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {h}
                  </span>
                ))}
              </div>

              {/* Order rows */}
              {filteredOrders.length === 0 ? (
                <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#888', padding: '24px 16px' }}>No orders found.</p>
              ) : (
                filteredOrders.map((order, i) => (
                  <div
                    key={order.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '160px 120px 100px 1fr 110px 140px',
                      gap: 12,
                      padding: '18px 16px',
                      borderBottom: i < filteredOrders.length - 1 ? '1px solid #f0ece6' : 'none',
                      alignItems: 'flex-start',
                    }}
                  >
                    {/* Order # */}
                    <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                      {order.id}
                    </span>

                    {/* Date */}
                    <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#555' }}>
                      {order.date}
                    </span>

                    {/* Status */}
                    <div><StatusBadge status={order.status} /></div>

                    {/* Items */}
                    <div>
                      <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#555', margin: '0 0 2px' }}>
                        {order.itemsCount} {order.itemsCount === 1 ? 'piece' : 'pieces'}
                      </p>
                      {order.items.map((it, j) => (
                        <div key={j}>
                          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#3a3a3a', margin: 0 }}>{it.name}</p>
                          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 11, color: '#aaa', margin: 0 }}>{it.detail}</p>
                        </div>
                      ))}
                      {order.priceNote && (
                        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 11, color: '#aaa', margin: '2px 0 0', whiteSpace: 'pre-line' }}>
                          {order.priceNote}
                        </p>
                      )}
                    </div>

                    {/* Total */}
                    <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 700, color: order.totalStrike ? '#aaa' : '#1a1a1a', textDecoration: order.totalStrike ? 'line-through' : 'none' }}>
                      {order.total}
                    </span>

                    {/* Actions */}
                    <div>
                      <button
                        type="button"
                        onClick={() => navigate(`/account/orders/${order.id}`)}
                        style={{
                          fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 500,
                          color: '#1a1a1a', background: '#fff',
                          border: '1px solid #ddd8d0', borderRadius: 999,
                          padding: '6px 14px', cursor: 'pointer', whiteSpace: 'nowrap',
                          transition: 'border-color 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#aaa'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = '#ddd8d0'}
                      >
                        View order details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Help link */}
            <div style={{ marginTop: 32 }}>
              <button
                type="button"
                style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Need help with an order?
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .orders-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .account-layout { flex-direction: column !important; }
          .account-layout aside { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
