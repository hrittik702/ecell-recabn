import {
  j as e,
  b as _,
  z as m,
  g as ee,
  a as re,
  u as ae,
  s as F,
  c as te,
  d as se,
  e as de,
  f as le,
} from './index-CcH5wGiM.js';
import { r as x, b as ie } from './vendor-D2pt6NKk.js';
import { k as P, l as oe } from './firebase-NJnrevVg.js';
import {
  q as T,
  r as ne,
  X as ce,
  U as xe,
  s as he,
  t as S,
  u as C,
  v as Y,
  w as ge,
  d as be,
  x as pe,
} from './icons-DCkyTIa-.js';
import './gsap-DsYOaFwG.js';
const ue = ({
    isAddingMember: l,
    setIsAddingMember: b,
    editingMemberId: i,
    setEditingMemberId: p,
    formData: s,
    setFormData: c,
    handleChange: o,
    handleAddMember: h,
    isSubmitting: f,
  }) =>
    e.jsx('div', {
      className: `transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden shrink-0 ${l ? 'max-h-[800px] lg:max-h-none opacity-100 lg:w-[350px] xl:w-[400px]' : 'max-h-0 lg:max-h-none lg:w-0 opacity-0'}`,
      children: e.jsxs('div', {
        className:
          'bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 p-6 h-fit w-full lg:w-[350px] xl:w-[400px]',
        children: [
          e.jsxs('div', {
            className:
              'flex justify-between items-center mb-5 border-b border-gray-200/50 dark:border-white/10 pb-5',
            children: [
              e.jsxs('div', {
                className: 'flex items-center gap-4',
                children: [
                  e.jsx('div', {
                    className:
                      'p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shadow-sm',
                    children: i ? e.jsx(T, { size: 20 }) : e.jsx(ne, { size: 20 }),
                  }),
                  e.jsx('h2', {
                    className: 'text-lg font-display font-bold text-gray-900 dark:text-white',
                    children: i ? 'Edit Member Profile' : 'Add New Member',
                  }),
                ],
              }),
              e.jsx('button', {
                type: 'button',
                onClick: () => {
                  (b(!1),
                    p(null),
                    c({ name: '', email: '', password: '', role: '', year: '', status: 'active' }));
                },
                className:
                  'text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors',
                children: e.jsx(ce, { size: 18 }),
              }),
            ],
          }),
          e.jsxs('form', {
            onSubmit: h,
            className: 'space-y-4',
            children: [
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className:
                      'block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans',
                    children: 'Full Name',
                  }),
                  e.jsx('input', {
                    type: 'text',
                    name: 'name',
                    value: s.name,
                    onChange: o,
                    required: !0,
                    className:
                      'w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm',
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className:
                      'block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans',
                    children: 'Email Address',
                  }),
                  e.jsx('input', {
                    type: 'email',
                    name: 'email',
                    value: s.email,
                    onChange: o,
                    required: !0,
                    disabled: !!i,
                    className: `w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm ${i ? 'opacity-60 cursor-not-allowed' : ''}`,
                  }),
                ],
              }),
              !i &&
                e.jsxs('div', {
                  children: [
                    e.jsx('label', {
                      className:
                        'block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans',
                      children: 'Initial Password',
                    }),
                    e.jsx('input', {
                      type: 'text',
                      name: 'password',
                      value: s.password,
                      onChange: o,
                      required: !0,
                      minLength: 6,
                      className:
                        'w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm',
                    }),
                  ],
                }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className:
                      'block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans',
                    children: 'Role / Designation',
                  }),
                  e.jsx('input', {
                    type: 'text',
                    name: 'role',
                    value: s.role,
                    onChange: o,
                    placeholder: 'e.g. Lead Coordinator, Designer',
                    required: !0,
                    className:
                      'w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm',
                  }),
                ],
              }),
              e.jsxs('div', {
                children: [
                  e.jsx('label', {
                    className:
                      'block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans',
                    children: 'Academic Year / Status',
                  }),
                  e.jsxs('select', {
                    name: 'year',
                    value: s.year,
                    onChange: o,
                    required: !0,
                    className:
                      'w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm cursor-pointer',
                    children: [
                      e.jsx('option', {
                        value: '',
                        disabled: !0,
                        children: 'Select Academic Year...',
                      }),
                      e.jsx('option', {
                        value: '1',
                        className: 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white',
                        children: '1st Year (Fresher)',
                      }),
                      e.jsx('option', {
                        value: '2',
                        className: 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white',
                        children: '2nd Year (Executive)',
                      }),
                      e.jsx('option', {
                        value: '3',
                        className: 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white',
                        children: '3rd Year (Senior Executive)',
                      }),
                      e.jsx('option', {
                        value: '4',
                        className: 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white',
                        children: '4th Year (Final Year Lead)',
                      }),
                      e.jsx('option', {
                        value: '5',
                        className: 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white',
                        children: '5th Year / Alumni (Hall of Fame)',
                      }),
                      e.jsx('option', {
                        value: '6',
                        className: 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white',
                        children: 'Former Member',
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx('button', {
                type: 'submit',
                disabled: f,
                className:
                  'w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold py-2.5 rounded-lg text-sm transition-all duration-300 disabled:opacity-70 flex justify-center items-center shadow-glow hover:shadow-glow-strong',
                children: f
                  ? e.jsx('div', {
                      className:
                        'w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin',
                    })
                  : i
                    ? 'Update Member Profile'
                    : 'Create Member Account',
              }),
            ],
          }),
        ],
      }),
    }),
  me = ({
    currentMembersList: l,
    alumniList: b,
    formerMembersList: i,
    loading: p,
    isAddingMember: s,
    setIsAddingMember: c,
    activeDropdownId: o,
    setActiveDropdownId: h,
    dropdownRef: f,
    handleEditClick: d,
    handleDeleteMember: k,
    getOrdinalYear: y,
  }) =>
    e.jsxs('div', {
      className: 'flex-1 w-full space-y-8 overflow-hidden',
      children: [
        e.jsxs('div', {
          className:
            'bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover',
          children: [
            e.jsxs('div', {
              className:
                'p-5 md:p-6 border-b border-gray-200/50 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
              children: [
                e.jsxs('div', {
                  className: 'flex items-center gap-4',
                  children: [
                    e.jsx('div', {
                      className:
                        'p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm',
                      children: e.jsx(xe, { size: 24 }),
                    }),
                    e.jsx('h2', {
                      className: 'text-xl font-display font-bold text-gray-900 dark:text-white',
                      children: 'Current Team Members',
                    }),
                  ],
                }),
                e.jsxs('div', {
                  className: 'flex items-center gap-3',
                  children: [
                    e.jsxs('span', {
                      className:
                        'bg-indigo-50 text-indigo-700 border border-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300 py-1.5 px-4 rounded-full text-sm font-bold shadow-sm',
                      children: [l.length, ' Members'],
                    }),
                    !s &&
                      e.jsxs('button', {
                        type: 'button',
                        onClick: () => c(!0),
                        className:
                          'flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm',
                        children: [e.jsx(he, { size: 16 }), 'Add Member'],
                      }),
                  ],
                }),
              ],
            }),
            e.jsx('div', {
              className: 'overflow-x-auto',
              children: p
                ? e.jsxs('div', {
                    className: 'w-full min-w-[600px]',
                    children: [
                      e.jsx('div', {
                        className:
                          'h-10 bg-gray-50/50 dark:bg-dark-surface/50 border-b border-gray-200/50 dark:border-white/10 w-full',
                      }),
                      [1, 2, 3, 4, 5].map((r) =>
                        e.jsxs(
                          'div',
                          {
                            className:
                              'flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/5 w-full animate-pulse bg-white/20 dark:bg-transparent',
                            children: [
                              e.jsx('div', {
                                className:
                                  'w-8 h-8 rounded-full bg-gray-200/60 dark:bg-white/10 shrink-0',
                              }),
                              e.jsx('div', {
                                className: 'h-4 bg-gray-200/60 dark:bg-white/10 rounded w-1/4',
                              }),
                              e.jsx('div', {
                                className:
                                  'h-4 bg-gray-200/60 dark:bg-white/10 rounded w-1/3 ml-auto',
                              }),
                              e.jsx('div', {
                                className:
                                  'h-6 w-16 bg-gray-200/60 dark:bg-white/10 rounded ml-auto',
                              }),
                            ],
                          },
                          r
                        )
                      ),
                    ],
                  })
                : l.length === 0
                  ? e.jsx('div', {
                      className: 'p-12 text-center text-gray-500 dark:text-gray-400 font-medium',
                      children: 'No active team members found.',
                    })
                  : e.jsxs('table', {
                      className: 'w-full text-left border-collapse min-w-[600px]',
                      children: [
                        e.jsx('thead', {
                          children: e.jsxs('tr', {
                            className:
                              'bg-gray-50/50 dark:bg-dark-surface/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200/50 dark:border-white/10',
                            children: [
                              e.jsx('th', {
                                className:
                                  'px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]',
                                children: 'Member',
                              }),
                              e.jsx('th', {
                                className:
                                  'px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]',
                                children: 'Email',
                              }),
                              e.jsx('th', {
                                className:
                                  'px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]',
                                children: 'Role',
                              }),
                              e.jsx('th', {
                                className:
                                  'px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]',
                                children: 'Year',
                              }),
                              e.jsx('th', { className: 'px-4 py-3 w-10' }),
                            ],
                          }),
                        }),
                        e.jsx('tbody', {
                          className: 'divide-y divide-gray-100 dark:divide-white/5',
                          children: l.map((r) =>
                            e.jsxs(
                              'tr',
                              {
                                className:
                                  'hover:bg-white/40 dark:hover:bg-white/5 transition-colors group',
                                children: [
                                  e.jsx('td', {
                                    className: 'px-4 py-3',
                                    children: e.jsxs('div', {
                                      className: 'flex items-center gap-3',
                                      children: [
                                        e.jsx('div', {
                                          className:
                                            'w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 flex items-center justify-center shrink-0',
                                          children: r.profileImage
                                            ? e.jsx('img', {
                                                src: r.profileImage,
                                                alt: r.name,
                                                className: 'w-full h-full object-cover',
                                              })
                                            : e.jsx('span', {
                                                className: 'text-xs font-bold text-gray-500',
                                                children: r.name
                                                  ? r.name.charAt(0).toUpperCase()
                                                  : 'U',
                                              }),
                                        }),
                                        e.jsx('span', {
                                          className:
                                            'font-bold text-gray-900 dark:text-white font-sans text-sm',
                                          children: r.name,
                                        }),
                                      ],
                                    }),
                                  }),
                                  e.jsx('td', {
                                    className:
                                      'px-4 py-3 text-gray-500 dark:text-gray-400 text-[13px] font-medium',
                                    children: r.email,
                                  }),
                                  e.jsx('td', {
                                    className: 'px-4 py-3',
                                    children: e.jsx('span', {
                                      className:
                                        'px-2.5 py-1 bg-white/60 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 rounded-md text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shadow-sm',
                                      children: r.role,
                                    }),
                                  }),
                                  e.jsxs('td', {
                                    className:
                                      'px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300',
                                    children: [y(r.year), ' Year'],
                                  }),
                                  e.jsxs('td', {
                                    className: 'px-4 py-3 relative text-right',
                                    children: [
                                      e.jsx('button', {
                                        type: 'button',
                                        onClick: () => h(o === r.id ? null : r.id),
                                        className:
                                          'p-1.5 text-gray-400 hover:text-indigo-500 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors',
                                        children: e.jsx(S, { size: 18 }),
                                      }),
                                      o === r.id &&
                                        e.jsxs('div', {
                                          ref: f,
                                          className:
                                            'absolute right-8 top-10 w-36 bg-white dark:bg-dark-surface rounded-xl shadow-premium dark:shadow-premium-dark border border-gray-100 dark:border-white/10 overflow-hidden z-50 py-1',
                                          children: [
                                            e.jsxs('button', {
                                              type: 'button',
                                              onClick: () => d(r),
                                              className:
                                                'w-full px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2',
                                              children: [e.jsx(T, { size: 14 }), 'Edit Profile'],
                                            }),
                                            e.jsxs('button', {
                                              type: 'button',
                                              onClick: () => k(r.id, r.name),
                                              className:
                                                'w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2',
                                              children: [e.jsx(C, { size: 14 }), 'Delete'],
                                            }),
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              },
                              r.id
                            )
                          ),
                        }),
                      ],
                    }),
            }),
          ],
        }),
        b.length > 0 &&
          e.jsxs('div', {
            className:
              'bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover',
            children: [
              e.jsxs('div', {
                className:
                  'p-5 md:p-6 border-b border-gray-200/50 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
                children: [
                  e.jsxs('div', {
                    className: 'flex items-center gap-4',
                    children: [
                      e.jsx('div', {
                        className:
                          'p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-sm',
                        children: e.jsx('svg', {
                          className: 'w-6 h-6',
                          fill: 'none',
                          stroke: 'currentColor',
                          viewBox: '0 0 24 24',
                          xmlns: 'http://www.w3.org/2000/svg',
                          children: e.jsx('path', {
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: 2,
                            d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
                          }),
                        }),
                      }),
                      e.jsxs('div', {
                        children: [
                          e.jsx('h2', {
                            className:
                              'text-xl font-display font-bold text-gray-900 dark:text-white',
                            children: 'Hall of Fame',
                          }),
                          e.jsx('p', {
                            className: 'text-xs text-gray-500 dark:text-gray-400 font-medium',
                            children: 'Passout Seniors & Mentors',
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs('span', {
                    className:
                      'bg-purple-50 text-purple-700 border border-purple-100 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-300 py-1.5 px-4 rounded-full text-sm font-bold shadow-sm',
                    children: [b.length, ' Members'],
                  }),
                ],
              }),
              e.jsx('div', {
                className: 'overflow-x-auto',
                children: e.jsxs('table', {
                  className: 'w-full text-left border-collapse min-w-[600px]',
                  children: [
                    e.jsx('thead', {
                      children: e.jsxs('tr', {
                        className:
                          'bg-gray-50/50 dark:bg-dark-surface/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200/50 dark:border-white/10',
                        children: [
                          e.jsx('th', {
                            className:
                              'px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]',
                            children: 'Member',
                          }),
                          e.jsx('th', {
                            className:
                              'px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]',
                            children: 'Email',
                          }),
                          e.jsx('th', {
                            className:
                              'px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]',
                            children: 'Role',
                          }),
                          e.jsx('th', { className: 'px-4 py-3 w-10' }),
                        ],
                      }),
                    }),
                    e.jsx('tbody', {
                      className: 'divide-y divide-gray-100 dark:divide-white/5',
                      children: b.map((r) =>
                        e.jsxs(
                          'tr',
                          {
                            className:
                              'hover:bg-white/40 dark:hover:bg-white/5 transition-colors group opacity-80 hover:opacity-100',
                            children: [
                              e.jsx('td', {
                                className: 'px-4 py-3',
                                children: e.jsxs('div', {
                                  className: 'flex items-center gap-3',
                                  children: [
                                    e.jsx('div', {
                                      className:
                                        'w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 flex items-center justify-center shrink-0',
                                      children: r.profileImage
                                        ? e.jsx('img', {
                                            src: r.profileImage,
                                            alt: r.name,
                                            className: 'w-full h-full object-cover grayscale',
                                          })
                                        : e.jsx('span', {
                                            className: 'text-xs font-bold text-gray-500',
                                            children: r.name ? r.name.charAt(0).toUpperCase() : 'U',
                                          }),
                                    }),
                                    e.jsx('span', {
                                      className:
                                        'font-bold text-gray-900 dark:text-white font-sans text-sm',
                                      children: r.name,
                                    }),
                                  ],
                                }),
                              }),
                              e.jsx('td', {
                                className:
                                  'px-4 py-3 text-gray-500 dark:text-gray-400 text-[13px] font-medium',
                                children: r.email,
                              }),
                              e.jsx('td', {
                                className: 'px-4 py-3',
                                children: e.jsx('span', {
                                  className:
                                    'px-2.5 py-1 bg-white/60 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 rounded-md text-[11px] font-bold text-gray-700 dark:text-gray-300 shadow-sm',
                                  children: r.role,
                                }),
                              }),
                              e.jsxs('td', {
                                className: 'px-4 py-3 relative text-right',
                                children: [
                                  e.jsx('button', {
                                    type: 'button',
                                    onClick: () => h(o === r.id ? null : r.id),
                                    className:
                                      'p-1.5 text-gray-400 hover:text-purple-500 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors',
                                    children: e.jsx(S, { size: 18 }),
                                  }),
                                  o === r.id &&
                                    e.jsxs('div', {
                                      ref: f,
                                      className:
                                        'absolute right-8 top-10 w-36 bg-white dark:bg-dark-surface rounded-xl shadow-premium dark:shadow-premium-dark border border-gray-100 dark:border-white/10 overflow-hidden z-50 py-1',
                                      children: [
                                        e.jsxs('button', {
                                          type: 'button',
                                          onClick: () => d(r),
                                          className:
                                            'w-full px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2',
                                          children: [e.jsx(T, { size: 14 }), 'Edit Profile'],
                                        }),
                                        e.jsxs('button', {
                                          type: 'button',
                                          onClick: () => k(r.id, r.name),
                                          className:
                                            'w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2',
                                          children: [e.jsx(C, { size: 14 }), 'Delete'],
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          },
                          r.id
                        )
                      ),
                    }),
                  ],
                }),
              }),
            ],
          }),
        i.length > 0 &&
          e.jsxs('div', {
            className:
              'bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover',
            children: [
              e.jsxs('div', {
                className:
                  'p-5 md:p-6 border-b border-gray-200/50 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
                children: [
                  e.jsxs('div', {
                    className: 'flex items-center gap-4',
                    children: [
                      e.jsx('div', {
                        className:
                          'p-3 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 shadow-sm',
                        children: e.jsx(Y, { size: 24 }),
                      }),
                      e.jsxs('div', {
                        children: [
                          e.jsx('h2', {
                            className:
                              'text-xl font-display font-bold text-gray-900 dark:text-white',
                            children: 'Former Members',
                          }),
                          e.jsx('p', {
                            className: 'text-xs text-gray-500 dark:text-gray-400 font-medium',
                            children: 'Previous Year Members',
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs('span', {
                    className:
                      'bg-gray-100 text-gray-700 border border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 py-1.5 px-4 rounded-full text-sm font-bold shadow-sm',
                    children: [i.length, ' Members'],
                  }),
                ],
              }),
              e.jsx('div', {
                className: 'overflow-x-auto',
                children: e.jsxs('table', {
                  className: 'w-full text-left border-collapse min-w-[600px]',
                  children: [
                    e.jsx('thead', {
                      children: e.jsxs('tr', {
                        className:
                          'bg-gray-50/50 dark:bg-dark-surface/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200/50 dark:border-white/10',
                        children: [
                          e.jsx('th', {
                            className:
                              'px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]',
                            children: 'Member',
                          }),
                          e.jsx('th', {
                            className:
                              'px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]',
                            children: 'Email',
                          }),
                          e.jsx('th', {
                            className:
                              'px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]',
                            children: 'Role',
                          }),
                          e.jsx('th', {
                            className:
                              'px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]',
                            children: 'Year',
                          }),
                          e.jsx('th', { className: 'px-4 py-3 w-10' }),
                        ],
                      }),
                    }),
                    e.jsx('tbody', {
                      className: 'divide-y divide-gray-100 dark:divide-white/5',
                      children: i.map((r) =>
                        e.jsxs(
                          'tr',
                          {
                            className:
                              'hover:bg-white/40 dark:hover:bg-white/5 transition-colors group opacity-60 hover:opacity-100',
                            children: [
                              e.jsx('td', {
                                className: 'px-4 py-3',
                                children: e.jsxs('div', {
                                  className: 'flex items-center gap-3',
                                  children: [
                                    e.jsx('div', {
                                      className:
                                        'w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 flex items-center justify-center shrink-0',
                                      children: r.profileImage
                                        ? e.jsx('img', {
                                            src: r.profileImage,
                                            alt: r.name,
                                            className: 'w-full h-full object-cover grayscale',
                                          })
                                        : e.jsx('span', {
                                            className: 'text-xs font-bold text-gray-500',
                                            children: r.name ? r.name.charAt(0).toUpperCase() : 'U',
                                          }),
                                    }),
                                    e.jsx('span', {
                                      className:
                                        'font-bold text-gray-900 dark:text-white font-sans text-sm',
                                      children: r.name,
                                    }),
                                  ],
                                }),
                              }),
                              e.jsx('td', {
                                className:
                                  'px-4 py-3 text-gray-500 dark:text-gray-400 text-[13px] font-medium',
                                children: r.email,
                              }),
                              e.jsx('td', {
                                className: 'px-4 py-3',
                                children: e.jsx('span', {
                                  className:
                                    'px-2.5 py-1 bg-white/60 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 rounded-md text-[11px] font-bold text-gray-600 dark:text-gray-400 shadow-sm',
                                  children: r.role,
                                }),
                              }),
                              e.jsxs('td', {
                                className:
                                  'px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400',
                                children: [y(r.year), ' Year'],
                              }),
                              e.jsxs('td', {
                                className: 'px-4 py-3 relative text-right',
                                children: [
                                  e.jsx('button', {
                                    type: 'button',
                                    onClick: () => h(o === r.id ? null : r.id),
                                    className:
                                      'p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors',
                                    children: e.jsx(S, { size: 18 }),
                                  }),
                                  o === r.id &&
                                    e.jsxs('div', {
                                      ref: f,
                                      className:
                                        'absolute right-8 top-10 w-36 bg-white dark:bg-dark-surface rounded-xl shadow-premium dark:shadow-premium-dark border border-gray-100 dark:border-white/10 overflow-hidden z-50 py-1',
                                      children: [
                                        e.jsxs('button', {
                                          type: 'button',
                                          onClick: () => d(r),
                                          className:
                                            'w-full px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2',
                                          children: [e.jsx(T, { size: 14 }), 'Edit Profile'],
                                        }),
                                        e.jsxs('button', {
                                          type: 'button',
                                          onClick: () => k(r.id, r.name),
                                          className:
                                            'w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2',
                                          children: [e.jsx(C, { size: 14 }), 'Delete'],
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          },
                          r.id
                        )
                      ),
                    }),
                  ],
                }),
              }),
            ],
          }),
      ],
    }),
  fe = ({
    taskData: l,
    setTaskData: b,
    handleTaskChange: i,
    handleAddTask: p,
    isSubmitting: s,
    isDropdownOpen: c,
    setIsDropdownOpen: o,
    filteredMembers: h,
    getOrdinalYear: f,
  }) =>
    e.jsxs('div', {
      className:
        'bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 p-6 h-fit transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover',
      children: [
        e.jsxs('div', {
          className:
            'flex items-center gap-4 mb-5 border-b border-gray-200/50 dark:border-white/10 pb-5',
          children: [
            e.jsx('div', {
              className:
                'p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shadow-sm',
              children: e.jsx(ge, { size: 20 }),
            }),
            e.jsx('h2', {
              className: 'text-lg font-display font-bold text-gray-900 dark:text-white',
              children: 'Assign Task',
            }),
          ],
        }),
        e.jsxs('form', {
          onSubmit: p,
          className: 'space-y-4',
          children: [
            e.jsxs('div', {
              children: [
                e.jsx('label', {
                  className:
                    'block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans',
                  children: 'Task Title',
                }),
                e.jsx('input', {
                  type: 'text',
                  name: 'title',
                  value: l.title,
                  onChange: i,
                  required: !0,
                  placeholder: 'e.g. Design Hackathon Poster',
                  className:
                    'w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm',
                }),
              ],
            }),
            e.jsxs('div', {
              children: [
                e.jsx('label', {
                  className:
                    'block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans',
                  children: 'Description',
                }),
                e.jsx('textarea', {
                  name: 'description',
                  value: l.description,
                  onChange: i,
                  required: !0,
                  rows: '3',
                  placeholder: 'Brief overview of expected deliverables...',
                  className:
                    'w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm resize-none',
                }),
              ],
            }),
            e.jsxs('div', {
              className: 'relative',
              children: [
                e.jsx('label', {
                  className:
                    'block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans',
                  children: 'Assign To',
                }),
                e.jsxs('div', {
                  className:
                    'w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm cursor-pointer flex justify-between items-center',
                  onClick: () => o(!c),
                  children: [
                    e.jsx('span', {
                      className: l.assignedTo
                        ? 'text-gray-900 dark:text-white font-medium'
                        : 'text-gray-500 dark:text-gray-400',
                      children: l.assignedTo
                        ? (() => {
                            const d = h.find((k) => k.id === l.assignedTo);
                            return d ? `${d.name} (${d.role})` : 'Select a member...';
                          })()
                        : 'Select a member...',
                    }),
                    e.jsx(be, {
                      size: 16,
                      className: `transition-transform duration-300 ${c ? 'rotate-180' : ''}`,
                    }),
                  ],
                }),
                c &&
                  e.jsx('div', {
                    className:
                      'absolute z-50 w-full mt-2 bg-white/95 dark:bg-[#1a1c23]/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-xl shadow-2xl max-h-56 overflow-y-auto custom-scrollbar',
                    children: h
                      .filter((d) => parseInt(d.year || 0) < 4)
                      .map((d) =>
                        e.jsxs(
                          'div',
                          {
                            className:
                              'px-4 py-3 text-sm hover:bg-gray-50/80 dark:hover:bg-white/5 cursor-pointer text-gray-800 dark:text-gray-200 border-b border-gray-100/50 dark:border-white/5 last:border-0 transition-colors flex items-center gap-3',
                            onClick: () => {
                              (b((k) => ({ ...k, assignedTo: d.id })), o(!1));
                            },
                            children: [
                              e.jsx('div', {
                                className:
                                  'w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-surface shrink-0 border border-gray-200/50 dark:border-white/10 flex items-center justify-center',
                                children: d.profileImage
                                  ? e.jsx('img', {
                                      src: d.profileImage,
                                      alt: d.name,
                                      className: 'w-full h-full object-cover',
                                    })
                                  : e.jsx('span', {
                                      className: 'text-xs font-bold text-gray-500',
                                      children: d.name ? d.name.charAt(0).toUpperCase() : 'U',
                                    }),
                              }),
                              e.jsxs('div', {
                                children: [
                                  e.jsx('div', {
                                    className: 'font-bold leading-tight mb-0.5',
                                    children: d.name,
                                  }),
                                  e.jsxs('div', {
                                    className:
                                      'text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold',
                                    children: [d.role, ' • ', f(d.year), ' Year'],
                                  }),
                                ],
                              }),
                            ],
                          },
                          d.id
                        )
                      ),
                  }),
                e.jsx('input', {
                  type: 'hidden',
                  name: 'assignedTo',
                  value: l.assignedTo,
                  required: !0,
                }),
              ],
            }),
            e.jsxs('div', {
              children: [
                e.jsx('label', {
                  className:
                    'block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans',
                  children: 'Deadline',
                }),
                e.jsx('input', {
                  type: 'date',
                  name: 'deadline',
                  value: l.deadline,
                  onChange: i,
                  required: !0,
                  className:
                    'w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm [color-scheme:light] dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer',
                }),
              ],
            }),
            e.jsx('button', {
              type: 'submit',
              disabled: s,
              className:
                'w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold py-2.5 rounded-lg text-sm transition-all duration-300 disabled:opacity-70 flex justify-center items-center shadow-glow hover:shadow-glow-strong',
              children: s
                ? e.jsx('div', {
                    className:
                      'w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin',
                  })
                : 'Assign Task',
            }),
          ],
        }),
      ],
    }),
  ke = ({ tasks: l, members: b, loading: i, handleDeleteTask: p }) =>
    e.jsxs('div', {
      className:
        'lg:col-span-2 bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover',
      children: [
        e.jsxs('div', {
          className:
            'p-5 md:p-6 border-b border-gray-200/50 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
          children: [
            e.jsxs('div', {
              className: 'flex items-center gap-4',
              children: [
                e.jsx('div', {
                  className:
                    'p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-sm',
                  children: e.jsx(pe, { size: 24 }),
                }),
                e.jsxs('div', {
                  children: [
                    e.jsx('h2', {
                      className: 'text-xl font-display font-bold text-gray-900 dark:text-white',
                      children: 'Active Tasks',
                    }),
                    e.jsx('p', {
                      className: 'text-xs text-gray-500 dark:text-gray-400 font-medium',
                      children: 'All ongoing assignments',
                    }),
                  ],
                }),
              ],
            }),
            e.jsxs('span', {
              className:
                'bg-purple-50 text-purple-700 border border-purple-100 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-300 py-1.5 px-4 rounded-full text-sm font-bold shadow-sm',
              children: [l.length, ' Tasks'],
            }),
          ],
        }),
        e.jsx('div', {
          className: 'overflow-x-auto p-5 md:p-6',
          children: i
            ? e.jsxs('div', {
                className: 'w-full min-w-[600px]',
                children: [
                  e.jsx('div', {
                    className:
                      'h-10 bg-gray-50/50 dark:bg-dark-surface/50 border-b border-gray-200/50 dark:border-white/10 w-full mb-2',
                  }),
                  [1, 2, 3, 4].map((s) =>
                    e.jsxs(
                      'div',
                      {
                        className:
                          'flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/5 w-full animate-pulse',
                        children: [
                          e.jsx('div', {
                            className: 'h-4 bg-gray-200/60 dark:bg-white/10 rounded w-1/4',
                          }),
                          e.jsx('div', {
                            className: 'h-4 bg-gray-200/60 dark:bg-white/10 rounded w-1/3 ml-auto',
                          }),
                          e.jsx('div', {
                            className: 'h-6 w-20 bg-gray-200/60 dark:bg-white/10 rounded ml-auto',
                          }),
                        ],
                      },
                      s
                    )
                  ),
                ],
              })
            : l.length === 0
              ? e.jsx('div', {
                  className: 'p-12 text-center text-gray-500 dark:text-gray-400 font-medium',
                  children: 'No tasks assigned yet.',
                })
              : e.jsx('div', {
                  className: 'space-y-4',
                  children: l.map((s) => {
                    const c = b.find((o) => o.id === s.assignedTo);
                    return e.jsxs(
                      'div',
                      {
                        className:
                          'bg-white/50 dark:bg-dark-surface/50 border border-gray-100 dark:border-white/5 p-4 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4',
                        children: [
                          e.jsxs('div', {
                            children: [
                              e.jsxs('div', {
                                className: 'flex items-center gap-3 mb-1',
                                children: [
                                  e.jsx('h4', {
                                    className: 'font-bold text-gray-900 dark:text-white',
                                    children: s.title,
                                  }),
                                  e.jsx('span', {
                                    className: `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${s.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'}`,
                                    children: s.status,
                                  }),
                                ],
                              }),
                              e.jsx('p', {
                                className: 'text-sm text-gray-500 dark:text-gray-400 mb-2',
                                children: s.description,
                              }),
                              e.jsxs('div', {
                                className:
                                  'flex flex-wrap gap-3 text-xs font-medium text-gray-500 dark:text-gray-400',
                                children: [
                                  e.jsxs('span', {
                                    className: 'bg-gray-100 dark:bg-white/5 px-2 py-1 rounded',
                                    children: ['Assigned to: ', c ? c.name : 'Unknown'],
                                  }),
                                  e.jsxs('span', {
                                    className:
                                      'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 px-2 py-1 rounded',
                                    children: [
                                      'Due: ',
                                      s.deadline
                                        ? new Date(s.deadline).toLocaleDateString()
                                        : 'No deadline',
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          e.jsx('button', {
                            type: 'button',
                            onClick: () => p(s.id),
                            className:
                              'p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors shrink-0',
                            title: 'Delete Task',
                            children: e.jsx(C, { size: 18 }),
                          }),
                        ],
                      },
                      s.id
                    );
                  }),
                }),
        }),
      ],
    }),
  Te = () => {
    const [l, b] = x.useState('team'),
      [i, p] = x.useState(!1),
      [s, c] = x.useState(null),
      [o, h] = x.useState([]),
      [f, d] = x.useState([]),
      [k, y] = x.useState(!0),
      [r, w] = x.useState(!1),
      [I, L] = x.useState(!1),
      [$, j] = x.useState(null),
      D = ie(),
      A = x.useRef(null);
    x.useEffect(() => {
      const a = (t) => {
        A.current && !A.current.contains(t.target) && j(null);
      };
      return (
        document.addEventListener('mousedown', a),
        () => document.removeEventListener('mousedown', a)
      );
    }, []);
    const [g, v] = x.useState({
        name: '',
        email: '',
        password: '',
        role: '',
        year: '',
        status: 'active',
      }),
      [E, z] = x.useState({ title: '', description: '', assignedTo: '', deadline: '' }),
      M = async () => {
        try {
          const a = await ee();
          d(a);
        } catch (a) {
          console.error('Failed to fetch tasks', a);
        }
      },
      q = async () => {
        try {
          y(!0);
          const a = await _();
          h(a);
        } catch {
          m.error('Failed to load members');
        } finally {
          y(!1);
        }
      };
    x.useEffect(() => {
      (q(), M());
    }, []);
    const R = async () => {
        try {
          (await P(re), D('/login'));
        } catch {
          m.error('Failed to log out');
        }
      },
      B = (a) => {
        const { name: t, value: n } = a.target;
        v((u) => ({ ...u, [t]: n }));
      },
      O = async (a) => {
        (a.preventDefault(), w(!0));
        try {
          if (s) {
            const t = { name: g.name, role: g.role, year: g.year, status: g.status || 'active' };
            (await ae(s, t),
              h((n) => n.map((u) => (u.id === s ? { ...u, ...t } : u))),
              m.success(`${g.name}'s profile updated!`));
          } else {
            const n = (await oe(F, g.email, g.password)).user.uid,
              u = {
                name: g.name,
                email: g.email,
                role: g.role || 'Member',
                systemRole: 'member',
                year: g.year,
                status: g.status || 'active',
                profileImage: '',
                linkedin: '',
                instagram: '',
                createdAt: new Date().toISOString(),
              };
            (await te(n, u),
              h((Z) => [...Z, { id: n, ...u }]),
              m.success('Member added successfully!'),
              await P(F));
          }
          (p(!1),
            c(null),
            v({ name: '', email: '', password: '', role: '', year: '', status: 'active' }));
        } catch (t) {
          (console.error(t),
            t.code === 'auth/email-already-in-use'
              ? m.error('This email is already in use by another member.')
              : m.error(`Failed to ${s ? 'update' : 'add'} member.`));
        } finally {
          w(!1);
        }
      },
      H = (a) => {
        (c(a.id),
          v({
            name: a.name || '',
            email: a.email || '',
            password: '',
            role: a.role || '',
            year: a.year || '',
            status: a.status || 'active',
          }),
          p(!0),
          j(null));
      },
      W = async (a, t) => {
        if (
          window.confirm(
            `Are you sure you want to remove ${t}? This will delete their profile from the website.`
          )
        )
          try {
            (await se(a),
              h((n) => n.filter((u) => u.id !== a)),
              m.success(`${t} has been removed.`));
          } catch (n) {
            (console.error(n), m.error('Failed to remove member.'));
          }
        j(null);
      },
      V = (a) => {
        const { name: t, value: n } = a.target;
        z((u) => ({ ...u, [t]: n }));
      },
      X = async (a) => {
        (a.preventDefault(), w(!0));
        try {
          (await de(E),
            m.success('Task assigned successfully!'),
            z({ title: '', description: '', assignedTo: '', deadline: '' }),
            M());
        } catch {
          m.error('Failed to create task');
        } finally {
          w(!1);
        }
      },
      G = async (a) => {
        window.confirm('Delete this task?') && (await le(a), M(), m.success('Task deleted'));
      },
      U = (a) => {
        const t = parseInt(a);
        return t
          ? t === 5
            ? e.jsx('span', {
                className:
                  'text-purple-600 dark:text-purple-400 font-bold tracking-wide uppercase text-[10px]',
                children: 'Alumni',
              })
            : t === 6
              ? e.jsx('span', {
                  className:
                    'text-gray-500 dark:text-gray-400 font-bold tracking-wide uppercase text-[10px]',
                  children: 'Former',
                })
              : t > 6
                ? e.jsx('span', {
                    className:
                      'text-purple-600 dark:text-purple-400 font-bold tracking-wide uppercase text-[10px]',
                    children: 'Alumni',
                  })
                : t === 1
                  ? e.jsxs('span', {
                      children: ['1', e.jsx('sup', { className: 'lowercase', children: 'st' })],
                    })
                  : t === 2
                    ? e.jsxs('span', {
                        children: ['2', e.jsx('sup', { className: 'lowercase', children: 'nd' })],
                      })
                    : t === 3
                      ? e.jsxs('span', {
                          children: ['3', e.jsx('sup', { className: 'lowercase', children: 'rd' })],
                        })
                      : t === 4
                        ? e.jsxs('span', {
                            children: [
                              '4',
                              e.jsx('sup', { className: 'lowercase', children: 'th' }),
                            ],
                          })
                        : e.jsx('span', { children: t })
          : e.jsx('span', { children: 'Member' });
      },
      N = o
        .filter((a) => a.systemRole !== 'admin' && a.role !== 'admin')
        .sort((a, t) => {
          const n = parseInt(t.year || 0) - parseInt(a.year || 0);
          return n !== 0 ? n : (a.name || '').localeCompare(t.name || '');
        }),
      J = N.filter((a) => parseInt(a.year || 0) <= 4 && a.status !== 'former'),
      K = N.filter((a) => parseInt(a.year || 0) === 5),
      Q = N.filter(
        (a) => (parseInt(a.year || 0) <= 4 && a.status === 'former') || parseInt(a.year || 0) === 6
      );
    return e.jsxs('div', {
      className: 'min-h-screen pt-28 pb-12 px-4 max-w-7xl mx-auto relative z-10',
      children: [
        e.jsxs('div', {
          className:
            'flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4',
          children: [
            e.jsxs('div', {
              children: [
                e.jsx('span', {
                  className:
                    'text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3 inline-block bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20',
                  children: 'Control Panel',
                }),
                e.jsx('h1', {
                  className:
                    'text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight',
                  children: 'Admin Dashboard',
                }),
                e.jsx('p', {
                  className: 'text-gray-600 dark:text-gray-300 mt-2 font-medium',
                  children: 'Manage E-Cell RECABN team members & assignments',
                }),
              ],
            }),
            e.jsxs('button', {
              type: 'button',
              onClick: R,
              className:
                'flex items-center gap-2 px-5 py-2.5 bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-all font-bold text-sm shadow-sm',
              children: [e.jsx(Y, { size: 16 }), e.jsx('span', { children: 'Sign Out' })],
            }),
          ],
        }),
        e.jsxs('div', {
          className:
            'flex border-b border-gray-200/50 dark:border-white/10 mb-8 gap-8 overflow-x-auto',
          children: [
            e.jsx('button', {
              type: 'button',
              onClick: () => b('team'),
              className: `pb-4 font-display font-bold text-lg whitespace-nowrap transition-colors border-b-2 ${l === 'team' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`,
              children: 'Team Management',
            }),
            e.jsx('button', {
              type: 'button',
              onClick: () => b('tasks'),
              className: `pb-4 font-display font-bold text-lg whitespace-nowrap transition-colors border-b-2 ${l === 'tasks' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`,
              children: 'Task Manager',
            }),
          ],
        }),
        l === 'team'
          ? e.jsxs('div', {
              className: `flex flex-col lg:flex-row-reverse items-start transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${i ? 'gap-8' : 'gap-0'}`,
              children: [
                e.jsx(ue, {
                  isAddingMember: i,
                  setIsAddingMember: p,
                  editingMemberId: s,
                  setEditingMemberId: c,
                  formData: g,
                  setFormData: v,
                  handleChange: B,
                  handleAddMember: O,
                  isSubmitting: r,
                }),
                e.jsx(me, {
                  currentMembersList: J,
                  alumniList: K,
                  formerMembersList: Q,
                  loading: k,
                  isAddingMember: i,
                  setIsAddingMember: p,
                  activeDropdownId: $,
                  setActiveDropdownId: j,
                  dropdownRef: A,
                  handleEditClick: H,
                  handleDeleteMember: W,
                  getOrdinalYear: U,
                }),
              ],
            })
          : e.jsxs('div', {
              className: 'grid grid-cols-1 lg:grid-cols-3 gap-8',
              children: [
                e.jsx(fe, {
                  taskData: E,
                  setTaskData: z,
                  handleTaskChange: V,
                  handleAddTask: X,
                  isSubmitting: r,
                  isDropdownOpen: I,
                  setIsDropdownOpen: L,
                  filteredMembers: N,
                  getOrdinalYear: U,
                }),
                e.jsx(ke, { tasks: f, members: o, loading: k, handleDeleteTask: G }),
              ],
            }),
      ],
    });
  };
export { Te as default };
