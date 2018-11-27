# server

do not use!
especially if you plan to use it for stuff related to bitcoins

currently affected by 

GHSA-mh6f-8j2x-4483
critical severity
Vulnerable versions: > 3.3.4
Patched version: No fix
The NPM package flatmap-stream is considered malicious. A malicious actor added this package as a dependency to the NPM event-stream package in versions 3.3.6 and later. Users of event-stream are encouraged to downgrade to the last non-malicious version, 3.3.4.

Users of flatmap-stream are encouraged to remove the dependency entirely.
