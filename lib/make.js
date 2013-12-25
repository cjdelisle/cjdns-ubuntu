/* vim: set expandtab ts=4 sw=4: */
/*
 * You may redistribute this program and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation,
 * either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var Spawn = require('child_process').spawn;
var nThen = require('nthen');

var run = function (name, args, callback) {
    var proc = Spawn(name, args);
    proc.stdout.on('data', function(dat) { console.log(dat.toString()); });
    proc.stderr.on('data', function(dat) { console.log(dat.toString()); });
    proc.on('close', function(ret) {
        if (ret) { throw new Error(proc + "returned non-zero"); }
        callback();
    });
};

var main = module.exports.main = function () {
    nThen(function (waitFor) {
        run('git', ['clone', 'git://github.com/cjdelisle/cjdns.git'], waitFor());

    }).nThen(function (waitFor) {
        process.chdir('cjdns');
        run('node', ['./node_build/make.js'], waitFor());

    });
};
