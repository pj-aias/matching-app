//
//  DistributedBbs.swift
//  MatchingApp
//
//  Created by 牧野青希 on 2021/08/31.
//

import Foundation@objc(DistributedBBS)
class DistributedBBS: NSObject {

  @objc
  func sign(_ message: String, _ credential: String, _ gpk: String, _ seed: String) -> String {
  }
  
  @objc
  func verify(_ message: String, _ signature: String, _ gpk: String) -> Bool {
  }
  
}
