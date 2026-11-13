# Updating Craft — sophieguyer.ch

Lessons from the security update on 2026-11-13 (Craft → 4.18.9). Same setup applies to
all Craft sites in Webroot: einkaufszentrum-oberdorf.ch, palme.ch, perle-am-see.ch,
sophieguyer.ch (Craft 4) and archivino.ch (Craft 5).

## Locally

1. Update Craft:
   ```
   # composer.json pins an exact version — `composer update` will not move Craft
   composer require craftcms/cms:<version> -W --no-security-blocking
   ```
2. Run migrations: `php craft migrate/all --interactive=0`
3. **Write and commit project config.** Production has `allowAdminChanges` off, so project
   config is read-only there — a migration that needs to change it will fail on the server.
   ```
   php craft project-config/diff     # anything from the update?
   php craft project-config/write
   ```
   Commit `config/project` together with `composer.json` / `composer.lock`.
4. Smoke-test the site, `composer audit`, commit, push.

## On the server (host `amoz`)

- The CLI `php` is **PHP 7.4** (PATH starts with /opt/php74/bin). Use
  `/opt/php83/bin/php` (or php82) for composer and craft — or once:
  `fish_add_path -p /opt/php83/bin` (shell is fish).
- Deploy:
  ```
  git pull
  /opt/php83/bin/php $(which composer) install --no-security-blocking
  /opt/php83/bin/php craft migrate/all --interactive=0
  /opt/php83/bin/php craft project-config/apply --interactive=0
  /opt/php83/bin/php craft clear-caches/all --interactive=0
  ```
- If a migration fails, Craft restores its DB backup but **does not drop tables the failed
  run created** (e.g. `oauth_*`). Drop those before retrying, or the retry fails with
  "table already exists".
- No editor on the server — read values with `grep ^DB_ .env`.
- The `i360: proactive defence is disabled` warnings come from the host's Imunify360, not Craft.

## Open

- Craft 4.18.x pins `twig/twig` ~3.19 and `enshrined/svg-sanitize` ~0.22, both with open
  advisories → Composer blocks updates unless `--no-security-blocking`. Only fixable by
  upgrading to **Craft 5**.
- `craftcms/redactor` is abandoned → replace with `craftcms/ckeditor` in the Craft 5 move.
