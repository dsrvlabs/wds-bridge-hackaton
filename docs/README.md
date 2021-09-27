# Top-level directory layout

```
├── components                          # Elements for pages
├── data                                # External Resources
├── docs                                # Dev documentation
├── layout                              # Frames for pages
├── pages                               # Pages
├── public                              # Static files
├── styles                              # Style files
└── theme                               # Theme-related files
```

# Directories

## components

```
.
├── ...
├── components
│   ├── theFront                        # Multipurpose templates
│   └── DOMAIN_DIRECTORIES              # Domain directories
└── ...
```

## data

```
.
├── ...
├── data
│   └── chaininfo
│        ├── chain-infos.ts             # ChainInfo
│        ├── chain-list-infos.ts        # ChainListInfo
│        ├── config.ts                  # Explorer, DefaultFee, APR etc.
│        └── stake-infos.ts             # StakeInfo
├── types.ts
├── DOMAIN_DIRECTORIES
└── ...
```

## docs

```
.
├── ...
├── docs
│   └── README.md                       # Directory overview
└── ...
```

## layout

```
.
├── ...
├── layout
│   ├── header                          # Header-related files
│   └── footer                          # Footer-related files
└── ...
```

## pages

```
.
├── ...
├── pages
│   └── api
│        ├── balance                    # Balance
│        ├── calculator                 # Staking information
│        ├── epoch                      # Epoch information
│        ├── price                      # Price information
│        ├── stake                      # Staking balance
│        └── staking-status             # Staking status information
├── _app.tsx
├── _document.tsx
├── index.tsx
├── DOMAIN_DIRECTORIES
└── ...
```
