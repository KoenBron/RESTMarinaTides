{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [ pkgs.python3 pkgs.python3Packages.pip pkgs.python3Packages.django ];
}