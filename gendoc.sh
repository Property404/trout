#!/usr/bin/env bash
files=( "Fixture" "PlayerScene" "GameManager" )
for fp in "${files[@]}"
do
	jsdoc2md "core/${fp}.js" > "doc/${fp}.md"
done
